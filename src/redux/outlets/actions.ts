import {
  // OutletData,
  SWITCH,
  SwitchData,
  SyncRequestData,
  OUTLET_SWITCH_CHANNEL,
  TIMER_ADJUST,
  SET_SWITCH_DATA,
  OUTLET_SYNC_CHANNEL,
  SET_SYNC_DATA,
  OutletDataValues,
  GroupsData,
  TimerData,
  OUTLET_TIMER_CHANNEL,
  SET_TIMER_DATA,
  TimerDataValues,
  // TIMER_CANCEL,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import {
  timerAdjustments,
  TimerButtonTask,
  MINUSMINUS,
  MINUS,
  PLUS,
  PLUSPLUS,
  STARTPAUSE,
  CANCEL,
} from '../../settings/timer-settings'
import { getGroupSettingValues } from '../../settings/group-settings'

export const socketListenAction = (): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    // listen to OUTLET_SWITCH_CHANNEL
    getState().sockets.socket.on(
      OUTLET_SWITCH_CHANNEL,
      (switchData: SwitchData) => {
        dispatch(setSwitchDataAction(switchData))
      }
    )
    getState().sockets.socket.on(
      OUTLET_SYNC_CHANNEL,
      (syncData: GroupsData) => {
        dispatch(setSyncDataAction(syncData))
      }
    )
    getState().sockets.socket.on(
      OUTLET_TIMER_CHANNEL,
      (timerData: TimerData) => {
        dispatch(setTimerDataAction(timerData))
      }
    )
  }
}

export const setSwitchDataAction = (switchData: SwitchData): any => {
  return {
    type: SET_SWITCH_DATA,
    payload: {
      switchData,
    },
  }
}

const setTimerDataAction = (timerData: TimerData): any => {
  return {
    type: SET_TIMER_DATA,
    payload: {
      timerData,
    },
  }
}

const setSyncDataAction = (syncData: {
  [group: string]: OutletDataValues
}) => ({
  type: SET_SYNC_DATA,
  payload: {
    syncData,
  },
})

export const requestSyncAction = (): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const groups: SyncRequestData = []
    for (const group in getState().outletData.groups) {
      groups.push(group)
    }
    getState().sockets.socket.emit(OUTLET_SYNC_CHANNEL, groups)
  }
}

// TODO **** fix 'any' to AppThunk with:
// https://react-redux.js.org/using-react-redux/static-typing#recommendations
// // import { AppThunk, RootState } from '../rootReducer'
export const switchRequestAction = (group: string, mode: boolean): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    // immediately dispatch for user feedback. (Don't wait for server)
    dispatch(switchAction(group, mode))
    const switchData: SwitchData = {
      [group]: { mode },
    }
    getState().sockets.socket.emit(OUTLET_SWITCH_CHANNEL, switchData)
  }
}

const switchAction = (group: string, mode: boolean): any => ({
  type: SWITCH,
  payload: {
    group,
    mode,
  },
})

function toggleStartPauseTimer(timerDataValues: TimerDataValues) {
  if (timerDataValues.isTimerRunning) {
    return {
      time: timerDataValues.time - Date.now(), // time left
      isTimerRunning: false,
    }
  } else {
    return {
      time: Date.now() + timerDataValues.time, // now + time left
      isTimerRunning: true,
    }
  }
}

function cancelTimer(timerDataValues: TimerDataValues, group: string) {
  let defaultTimer = 0
  const values = getGroupSettingValues(group)
  if (values) {
    defaultTimer = values.defaultTimer
  }
  return {
    time: defaultTimer,
    isTimerRunning: false,
  }
}

function calcNewTime(
  state: RootState,
  timerDataValues: TimerDataValues,
  group: string,
  msAdjustment: number
): TimerDataValues {
  let newTime = state.outletData.groups[group].time + msAdjustment
  const isTimerRunning = state.outletData.groups[group].isTimerRunning
  const showTimer = state.userSettings.groups[group].showTimer
  const increment = timerAdjustments.plus
  if (!isTimerRunning && newTime < 0) {
    newTime = 0
  }
  // // BEFORE ROUNDING
  // // running AND showTimer => SUBTRACT Date.now()
  // // running AND !showTimer => nothing
  // // !running AND showTimer => nothing
  // // !running AND !showTimer => ADD Date.now()
  if (isTimerRunning && showTimer) {
    newTime -= Date.now()
  } else if (!isTimerRunning && !showTimer) {
    newTime += Date.now()
  }
  // NOTE: You don't have to distinguish between showTimer or not showTimer
  if (msAdjustment > 0) {
    newTime = Math.floor(newTime / increment) * increment
  } else {
    newTime = Math.ceil((newTime - 999) / increment) * increment
  }
  if (isTimerRunning && showTimer) {
    newTime += Date.now()
  } else if (!isTimerRunning && !showTimer) {
    newTime -= Date.now()
  }
  if (isTimerRunning && showTimer) {
    // Time for user to mentally process what just happened
    newTime += 999
  }
  return {
    ...timerDataValues,
    time: newTime,
  }
}

export const timerAdjustRequestAction = (
  task: TimerButtonTask,
  group: string
): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    let timerDataValues: TimerDataValues = {
      time: state.outletData.groups[group].time,
      isTimerRunning: state.outletData.groups[group].isTimerRunning,
    }
    switch (task) {
      case MINUSMINUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.minusminus
        )
        break
      case MINUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.minus
        )
        break
      case PLUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.plus
        )
        break
      case PLUSPLUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.plusplus
        )
        break
      case STARTPAUSE:
        timerDataValues = toggleStartPauseTimer(timerDataValues)
        break
      case CANCEL:
        timerDataValues = cancelTimer(timerDataValues, group)
        break

      default:
        break
    }

    dispatch(timerAdjustAction(group, timerDataValues))
    const timerData: TimerData = {
      [group]: {
        ...timerDataValues,
      },
    }
    state.sockets.socket.emit(OUTLET_TIMER_CHANNEL, timerData)
  }
}

const timerAdjustAction = (
  group: string,
  timerDataValues: TimerDataValues
): any => ({
  type: TIMER_ADJUST,
  payload: {
    group,
    timerDataValues,
  },
})
