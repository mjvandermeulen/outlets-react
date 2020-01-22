import {
  UserSettings,
  UserSettingsActionTypes,
  userSettingsActions,
} from './types'
import { groupsSettings } from '../../settings/group-settings'

const initialState: UserSettings = { groups: {}, showCodes: false }

groupsSettings.forEach((groupSetting, index) => {
  if (groupSetting.enabled) {
    initialState.groups[groupSetting.group] = {
      expandGroup: false,
      showTimer: true,
    }
  }
})

export function userSettingsReducer(
  state = initialState,
  action: UserSettingsActionTypes
): UserSettings {
  switch (action.type) {
    case userSettingsActions.TOGGLE_EXPAND_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group]: {
            ...state.groups[action.payload.group],
            expandGroup: !state.groups[action.payload.group].expandGroup,
          },
        },
      }
    case userSettingsActions.TOGGLE_SHOW_TIMER:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group]: {
            ...state.groups[action.payload.group],
            showTimer: !state.groups[action.payload.group].showTimer,
          },
        },
      }

    default:
      return state
  }
}
