import {
  UserSettings,
  UserSettingsActionTypes,
  TOGGLE_EXPAND_GROUP,
  TOGGLE_SHOW_TIMER,
} from './types'
import { groupsSettings } from '../../settings/group-settings'

const initialState: UserSettings = {}

groupsSettings.forEach((groupSetting, index) => {
  if (groupSetting.enabled) {
    initialState[groupSetting.group] = {
      expandGroup: false,
      showTimer: true,
    }
  }
})

export function UserSettingsReducer(
  state = initialState,
  action: UserSettingsActionTypes
): UserSettings {
  switch (action.type) {
    case TOGGLE_EXPAND_GROUP:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
          expandGroup: !state[action.payload.group].expandGroup,
        },
      }
    case TOGGLE_SHOW_TIMER:
      return {
        ...state,
        [action.payload.group]: {
          ...state[action.payload.group],
          showTimer: !state[action.payload.group].showTimer,
        },
      }

    default:
      return state
  }
}
