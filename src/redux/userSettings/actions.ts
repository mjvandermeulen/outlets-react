import { UserSettingsActionTypes, userSettingsActions } from './types'

// FUNCTION
export function toggleShowTimerAction(group: string): UserSettingsActionTypes {
  return {
    type: userSettingsActions.TOGGLE_SHOW_TIMER,
    payload: {
      group,
    },
  }
}
