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
  SET_SYNC_DATA,
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
      for (const group in action.payload.switchData) {
        if (group in state) {
          state[group] = {
            time: state[group].time,
            isTimerRunning: state[group].isTimerRunning,
            ...action.payload.switchData[group],
          }
        }
      }
      return { ...state } // TODO **** trying something new, but never change the parameters...
    case SET_SYNC_DATA:
      const setSyncDataState = { ...state } // just in case not all groups got returned by server
      for (const stateGroup in state) {
        if (stateGroup in action.payload.syncData) {
          setSyncDataState[stateGroup] = action.payload.syncData[stateGroup]
        }
      }
      return setSyncDataState

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
