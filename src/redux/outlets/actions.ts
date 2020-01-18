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
  // TIMER_CANCEL,
} from './types'
import { Dispatch } from 'redux'
import { AppThunk } from '../rootReducer'

export const socketListenAction = (socket: SocketIOClient.Socket): any => {
  return (dispatch: Dispatch) => {
    socket.on(OUTLET_SWITCH_CHANNEL, (switchData: SwitchData) => {
      dispatch
    }

  }
}

// TODO ****** fix any to AppThunk with:
// https://react-redux.js.org/using-react-redux/static-typing#recommendations
export const switchAction = (
  socket: SocketIOClient.Socket,
  group: string,
  mode: boolean
): any => {
  return (dispatch: Dispatch) => {
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
    socket.emit(OUTLET_SWITCH_CHANNEL, switchData)
  }
}

export const setModeAction = {
  
}

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
