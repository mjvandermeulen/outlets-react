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

export function OutletsReducer(
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
