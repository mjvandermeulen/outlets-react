import {
  UserSettingsActionTypes,
  TOGGLE_EXPAND_GROUP,
  TOGGLE_SHOW_TIMER,
} from './types'

// LEARN ** typescript
// FAT ARROW
export const toggleExpandAction = (group: string): UserSettingsActionTypes => ({
  type: TOGGLE_EXPAND_GROUP,
  payload: {
    group,
  },
})

// FUNCTION
export function toggleShowTimerAction(group: string): UserSettingsActionTypes {
  return {
    type: TOGGLE_SHOW_TIMER,
    payload: {
      group,
    },
  }
}
