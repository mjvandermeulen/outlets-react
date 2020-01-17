interface SwitchDataValues {
  mode: boolean
}

// The switch data can have multiple outletgroups
// Not for redux, but for syncing... ?
export interface SwitchData {
  [group: string]: SwitchDataValues
}

interface TimerDataValues {
  time: number
  isTimerRunning: boolean
}

export interface TimerData {
  [group: string]: TimerDataValues
}

type SyncRequestData = string[] // array of groups

export interface OutletDataValues extends SwitchDataValues, TimerDataValues {}
// OR
// type OutletDataValues = SwitchDataValues & TimerDataValues // **** LEARN

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
// LEARN ***
// type OmitGroup<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type SocketData = OmitGroup<GroupSocketData, 'group'>

// https://www.educba.com/typescript-type-vs-interface/
// type used here, because it's easier to read than interface
// interface OutletData extends Array<OutletDataValues> {}
export type OutletData = {
  [group: string]: OutletDataValues
}

// actions
export const SWITCH = 'SWITCH'
export const TIMER_PLUS = 'TIMER_PLUS'
export const TIMER_PLUSPLUS = 'TIMER_PLUSPLUS'
export const TIMER_MINUS = 'TIMER_MINUS'
export const TIMER_MINUSMINUS = 'TIMER_MINUSMINUS'
export const TIMER_STARTPAUSE = 'TIMER_STARTPAUSE'
export const TIMER_CANCEL = 'TIMER_CANCEL'

export const SYNC_GROUP = 'SYNC_GROUP' // TODO implement

// export type AppThunk<ReturnType=void> = ThunkAction

interface SwitchAction {
  type: typeof SWITCH
  payload: {
    group: string
    mode: boolean
  }
}

interface TimerPlusAction {
  type: typeof TIMER_PLUS
  payload: {
    group: string
  }
}
interface TimerlusPlusAction {
  type: typeof TIMER_PLUSPLUS
  payload: {
    group: string
  }
}
interface TimerMinusAction {
  type: typeof TIMER_MINUS
  payload: {
    group: string
  }
}
interface TimerMinusMinusAction {
  type: typeof TIMER_MINUSMINUS
  payload: {
    group: string
  }
}
interface TimerStartPauseAction {
  type: typeof TIMER_STARTPAUSE
  payload: {
    group: string
  }
}
interface TimerCancelAction {
  type: typeof TIMER_CANCEL
  payload: {
    group: string
  }
}

export type OutletActionTypes =
  | SwitchAction
  | TimerPlusAction
  | TimerlusPlusAction
  | TimerMinusAction
  | TimerMinusMinusAction
  | TimerStartPauseAction
  | TimerCancelAction
