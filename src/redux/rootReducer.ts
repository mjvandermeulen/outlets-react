import { combineReducers } from 'redux'
import { UserSettingsReducer } from './userSettings/reducers'

export const rootReducer = combineReducers({
  userSettings: UserSettingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
