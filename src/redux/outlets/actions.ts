import {
  // OutletData,
  OutletActionTypes,
  SWITCH,
  TIMER_PLUS,
  TIMER_PLUSPLUS,
  TIMER_MINUSMINUS,
  TIMER_MINUS,
  TIMER_STARTPAUSE,
  SwitchData,
  SyncRequestData,
  OUTLET_SWITCH_CHANNEL,
  SET_SWITCH_DATA,
  OUTLET_SYNC_CHANNEL,
  OutletData,
  SET_SYNC_DATA,
  // TIMER_CANCEL,
} from './types'
import { Dispatch } from 'redux'
import { AppThunk, RootState } from '../rootReducer'

export const socketListenAction = (): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    // listen to OUTLET_SWITCH_CHANNEL
    getState().sockets.socket.on(
      OUTLET_SWITCH_CHANNEL,
      (switchData: SwitchData) => {
        dispatch({
          type: SET_SWITCH_DATA,
          payload: {
            switchData,
          },
        })
      }
    )
    getState().sockets.socket.on(
      OUTLET_SYNC_CHANNEL,
      (syncData: OutletData) => {
        dispatch({
          type: SET_SYNC_DATA,
          payload: {
            syncData,
          },
        })
      }
    )
    // TODO: LISTEN TO OTHER CHANNELS *****
  }
}

export const requestSyncAction = (): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const groups: SyncRequestData = []
    for (const group in getState().outletData) {
      groups.push(group)
    }
    getState().sockets.socket.emit(OUTLET_SYNC_CHANNEL, groups)
  }
}

// TODO ****** fix any to AppThunk with:
// https://react-redux.js.org/using-react-redux/static-typing#recommendations
export const switchAction = (group: string, mode: boolean): any => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    // immediately dispatch for user feedback. (Don't wait for server)
    dispatch({
      type: SWITCH,
      payload: {
        group,
        mode,
      },
    })
    const switchData: SwitchData = {
      [group]: { mode },
    }
    getState().sockets.socket.emit(OUTLET_SWITCH_CHANNEL, switchData)
  }
}

export const setModeAction = {}

// export const timerPlusAction = (group: string) : OutletActionTypes => ({
//     type: TIMER_PLUS,
//     payload: {
//         group,
//     }
// })

// export const Action = (group: string) : OutletActionTypes => ({
//     type: TIMER_PLUSPLUS,
//     payload: {
//         group,
//     }
// })

// export const Action = (group: string) : OutletActionTypes => ({
//     type: TIMER_MINUSMINUS,
//     payload: {
//         group,
//     }
// })

// export const Action = (group: string) : OutletActionTypes => ({
//     type: TIMER_MINUS,
//     payload: {
//         group,
//     }
// })

// export const Action = (group: string) : OutletActionTypes => ({
//     type: TIMER_STARTPAUSE,
//     payload: {
//         group,
//     }
// })

// export const Action = (group: string) : OutletActionTypes => ({
//     type: TIMER_CANCE,,
//     payload: {
//         group,
//     }
// })
