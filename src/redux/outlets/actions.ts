import {
  // OutletData,
  OutletActionTypes,
  SWITCH,
  TIMER_PLUS,
  TIMER_PLUSPLUS,
  TIMER_MINUSMINUS,
  TIMER_MINUS,
  TIMER_STARTPAUSE,
  // TIMER_CANCEL,
} from './types'

export const switchAction = (group: string, mode: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: SWITCH,
      payload: {
        group,
        mode,
      },
    })
  }
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
