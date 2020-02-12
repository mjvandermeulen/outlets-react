import {
  OUTLET_SWITCH_CHANNEL,
  OUTLET_TIMER_CHANNEL,
  OUTLET_SYNC_CHANNEL,
  SET_SWITCH_DATA,
  SET_TIMER_DATA,
  SET_SYNC_DATA,
  PASS,
  SwitchData,
  TimerData,
  SyncRequestData,
} from './types'

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

// TODO *** fix 'any' to AppThunk with:
// https://react-redux.js.org/using-react-redux/static-typing#recommendations
// // import { AppThunk, RootState } from '../rootReducer'
export const sendSwitchDataAction = (data: SwitchData): any => ({
  type: SET_SWITCH_DATA,
  socketChannel: OUTLET_SWITCH_CHANNEL,
  payload: {
    data,
  },
})

export const sendSyncRequestAction = (data: SyncRequestData) => ({
  type: PASS, // Don't do anything in reducer.
  socketChannel: OUTLET_SYNC_CHANNEL,
  payload: {
    data,
  },
})

export const sendTimerDataAction = (timerData: TimerData): any => ({
  type: SET_TIMER_DATA,
  socketChannel: OUTLET_TIMER_CHANNEL,
  payload: {
    data: timerData,
  },
})
