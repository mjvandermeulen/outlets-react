// state slices
export interface UserSetting {
  expandGroup: boolean
  showTimer: boolean
}
export interface UserSettings {
  groups: {
    [group: string]: UserSetting
  }
  showCodes: boolean
}

// actions
export const TOGGLE_EXPAND_GROUP = 'TOGGLE_EXPAND_GROUP'
export const TOGGLE_SHOW_TIMER = 'TOGGLE_SHOW_TIMER'

interface ToggleExpandAction {
  type: typeof TOGGLE_EXPAND_GROUP
  payload: {
    group: string
  }
}

interface ToggleShowTimerAction {
  type: typeof TOGGLE_SHOW_TIMER
  payload: {
    group: string
  }
}

export type UserSettingsActionTypes = ToggleExpandAction | ToggleShowTimerAction
