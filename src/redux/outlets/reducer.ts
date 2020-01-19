import {
  OutletData,
  OutletActionTypes,
  SWITCH,
  TIMER_PLUS,
  TIMER_PLUSPLUS,
  TIMER_MINUSMINUS,
  TIMER_MINUS,
  TIMER_STARTPAUSE,
  TIMER_CANCEL,
  SET_SWITCH_DATA,
} from './types'
import { groupsSettings } from '../../settings/group-settings'

const initialState: OutletData = {}

groupsSettings.forEach((groupSetting, index) => {
  if (groupSetting.enabled) {
    initialState[groupSetting.group] = {
      mode: false,
      time: groupSetting.defaultTimer,
      isTimerRunning: false,
    }
  }
})

export function outletsReducer(
  state = initialState,
  action: OutletActionTypes
): OutletData {
  switch (action.type) {
    case SWITCH:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
          mode: action.payload.mode,
        },
      }
    case SET_SWITCH_DATA:
      console.log('SET_SWITCH_DATA')
      const returnState = { ...state }
      for (const group in action.payload.switchData) {
        if (group in state) {
          returnState[group] = {
            time: state[group].time,
            isTimerRunning: state[group].isTimerRunning,
            ...action.payload.switchData[group],
          }
        }
      }
      return returnState

    case TIMER_PLUS:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    case TIMER_PLUSPLUS:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    case TIMER_MINUS:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    case TIMER_MINUSMINUS:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    case TIMER_STARTPAUSE:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    case TIMER_CANCEL:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
        },
      }
    default:
      return state
  }
}
