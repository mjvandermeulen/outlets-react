import {
  OutletData,
  OutletActionTypes,
  SWITCH,
  SET_SWITCH_DATA,
  SET_SYNC_DATA,
  GroupsData,
  TIMER_ADJUST,
  SET_TIMER_DATA,
} from './types'
import { groupsSettings } from '../../settings/group-settings'

const groups: GroupsData = {}

groupsSettings.forEach((groupSetting, index) => {
  if (groupSetting.enabled) {
    groups[groupSetting.group] = {
      mode: false,
      time: groupSetting.defaultTimer,
      isTimerRunning: false,
    }
  }
})

const initialState: OutletData = { groups }

export function outletsReducer(
  state = initialState,
  action: OutletActionTypes
): OutletData {
  switch (action.type) {
    case SWITCH:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group]: {
            ...state.groups[action.payload.group],
            mode: action.payload.mode,
          },
        },
      }
    case SET_SWITCH_DATA:
      for (const group in action.payload.switchData) {
        if (group in state.groups) {
          // modifying state here, but returning a new object. UGLY-ish
          // I think I prefer: const setSwitchDataState = {...state}
          // ...
          // return setSwitchDataState
          state.groups[group] = {
            time: state.groups[group].time,
            isTimerRunning: state.groups[group].isTimerRunning,
            ...action.payload.switchData[group],
          }
        }
      }
      // LEARN and TODO **** trying something new
      // BUT I DON"T LIKE IT MYSELF: never change the parameters...see notes above
      return { ...state }
    case SET_TIMER_DATA:
      const setTimerDataGroupsState: GroupsData = { ...state.groups }
      for (const stateGroup in setTimerDataGroupsState) {
        if (stateGroup in action.payload.timerData) {
          setTimerDataGroupsState[stateGroup] = {
            ...setTimerDataGroupsState[stateGroup],
            ...action.payload.timerData[stateGroup],
          }
        }
      }
      return {
        ...state,
        groups: setTimerDataGroupsState,
      }
    case SET_SYNC_DATA:
      const setSyncDataGroupsState: GroupsData = { ...state.groups } // just in case not all groups got returned by server
      for (const stateGroup in state.groups) {
        if (stateGroup in action.payload.syncData) {
          setSyncDataGroupsState[stateGroup] =
            action.payload.syncData[stateGroup] //action.payload.syncData[stateGroup]
        }
      }
      return {
        ...state,
        groups: setSyncDataGroupsState,
      }

    case TIMER_ADJUST:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group]: {
            ...state.groups[action.payload.group],
            ...action.payload.timerDataValues,
          },
        },
      }
    default:
      return state
  }
}
