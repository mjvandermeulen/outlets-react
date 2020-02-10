import { combineReducers, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { outletsReducer } from './outlets/reducer'

export const rootReducer = combineReducers({
  outletData: outletsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>> // **** used???
