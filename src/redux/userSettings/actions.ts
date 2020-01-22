import { UserSettingsActionTypes, userSettingsActions } from './types'

// LEARN ** typescript
// FAT ARROW
export const toggleExpandAction = (group: string): UserSettingsActionTypes => ({
  type: userSettingsActions.TOGGLE_EXPAND_GROUP,
  payload: {
    group,
  },
})

// FUNCTION
export function toggleShowTimerAction(group: string): UserSettingsActionTypes {
  return {
    type: userSettingsActions.TOGGLE_SHOW_TIMER,
    payload: {
      group,
    },
  }
}
