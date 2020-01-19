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
  OUTLET_SWITCH_CHANNEL,
  SET_SWITCH_DATA,
  // TIMER_CANCEL,
} from './types'
import { Dispatch } from 'redux'
import { AppThunk, RootState } from '../rootReducer'

export const socketListenAction = (): any => {
  console.log('here ******* 19')
  return (dispatch: Dispatch, getState: () => RootState) => {
    // listen to OUTLET_SWITCH_CHANNEL
    getState().sockets.socket.on(
      OUTLET_SWITCH_CHANNEL,
      (switchData: SwitchData) => {
        console.log('received*******')
        dispatch({
          type: SET_SWITCH_DATA,
          payload: {
            switchData,
          },
        })
      }
    )
    // TODO: LISTEN TO OTHER CHANNELS *****
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
