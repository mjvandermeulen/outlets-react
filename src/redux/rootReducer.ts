import { combineReducers } from 'redux'
import { UserSettingsReducer } from './userSettings/reducer'
import { OutletsReducer } from './outlets/reducer'

export const rootReducer = combineReducers({
  userSettings: UserSettingsReducer,
  outletData: OutletsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
