import { combineReducers, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { outletsReducer } from './outlets/reducer'
import { socketsReducer } from './sockets/reducer'

export const rootReducer = combineReducers({
  outletData: outletsReducer,
  sockets: socketsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
