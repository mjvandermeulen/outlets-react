import { mirroredKeys } from '../../tools/mirroredKeys'

// import keyMirror from 'keymirror' TODO remove and check package.jsdon

// state slices
export interface UserSetting {
  showTimer: boolean
}
export interface UserSettings {
  groups: {
    [group: string]: UserSetting
  }
  showCodes: boolean
}

// actions
export const userSettingsActions = mirroredKeys([
  'TOGGLE_EXPAND_GROUP',
  'TOGGLE_SHOW_TIMER',
])

interface ToggleExpandAction {
  type: typeof userSettingsActions.TOGGLE_EXPAND_GROUP
  payload: {
    group: string
  }
}

interface ToggleShowTimerAction {
  type: typeof userSettingsActions.TOGGLE_SHOW_TIMER
  payload: {
    group: string
  }
}

export type UserSettingsActionTypes = ToggleExpandAction | ToggleShowTimerAction
