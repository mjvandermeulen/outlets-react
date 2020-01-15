import {
  UserSettingsActionTypes,
  TOGGLE_EXPAND,
  TOGGLE_SHOW_TIMER,
} from './types'

// LEARN ****
// Open the Command Palette (view menu → command palette)
// Enter TypeScript: Restart TS server.

// LEARN ****
// FAT ARROW
export const toggleExpandAction = (group: string): UserSettingsActionTypes => ({
  type: TOGGLE_EXPAND,
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
