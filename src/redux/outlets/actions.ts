import {
  // OutletData,
  SwitchData,
  SyncRequestData,
  OUTLET_SWITCH_CHANNEL,
  TIMER_ADJUST,
  SET_SWITCH_DATA,
  OUTLET_SYNC_CHANNEL,
  SET_SYNC_DATA,
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
import { getGroupSetting } from '../../settings/group-settings'
import { socket } from '../../App'

export const receiveSwitchDataAction = (): any => {
  return {
    type: SET_SWITCH_DATA,
    socketChannel: OUTLET_SWITCH_CHANNEL,
  }
}

export const receiveTimerDataAction = (): any => {
  return {
    type: SET_TIMER_DATA,
    socketChannel: OUTLET_TIMER_CHANNEL,
  }
}

// *** THOUGHTS This could be deleted, and only send this data over the other 2 channels...
export const receiveSyncDataAction = () => ({
  type: SET_SYNC_DATA,
  socketChannel: OUTLET_SYNC_CHANNEL,
})

export const requestSyncAction = (): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const groups: SyncRequestData = []
    for (const group in getState().outletData.groups) {
      groups.push(group)
    }
    socket.emit(OUTLET_SYNC_CHANNEL, groups)
  }
}

// TODO **** fix 'any' to AppThunk with:
// https://react-redux.js.org/using-react-redux/static-typing#recommendations
// // import { AppThunk, RootState } from '../rootReducer'
export const sendSwitchDataAction = (data: SwitchData): any => ({
  type: SET_SWITCH_DATA,
  socketChannel: OUTLET_SWITCH_CHANNEL,
  payload: {
    data,
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
  const values = getGroupSetting(group)
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
  msAdjustment: number,
  showTimer: boolean
): TimerDataValues {
  let newTime = state.outletData.groups[group].time + msAdjustment
  const isTimerRunning = state.outletData.groups[group].isTimerRunning
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
  group: string,
  showTimer: boolean
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
          timerAdjustments.minusminus,
          showTimer
        )
        break
      case MINUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.minus,
          showTimer
        )
        break
      case PLUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.plus,
          showTimer
        )
        break
      case PLUSPLUS:
        timerDataValues = calcNewTime(
          state,
          timerDataValues,
          group,
          timerAdjustments.plusplus,
          showTimer
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
    socket.emit(OUTLET_TIMER_CHANNEL, timerData)
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
