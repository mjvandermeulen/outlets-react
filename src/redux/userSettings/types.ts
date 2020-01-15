// state slices
export interface UserSetting {
  expandGroup: boolean
  showTimer: boolean
}
export interface UserSettings {
  [group: string]: UserSetting
}

// actions
export const TOGGLE_EXPAND = 'TOGGLE_EXPAND'
export const TOGGLE_SHOW_TIMER = 'TOGGLE_SHOW_TIMER'

interface ToggleExpandAction {
  type: typeof TOGGLE_EXPAND
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
