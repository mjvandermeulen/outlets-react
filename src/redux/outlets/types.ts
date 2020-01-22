interface SwitchDataValues {
  mode: boolean
}

// The switch data can have multiple outletgroups
// Not for redux, but for syncing... ?
export interface SwitchData {
  [group: string]: SwitchDataValues
}

export interface TimerDataValues {
  time: number
  isTimerRunning: boolean
}

export interface TimerData {
  [group: string]: TimerDataValues
}

export type SyncRequestData = string[] // array of groups

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

export interface GroupsData {
  [group: string]: OutletDataValues
}

export type OutletData = {
  groups: GroupsData
}

// actions
export const SET_SWITCH_DATA = 'SET_SWITCH_DATA'
export const SET_TIMER_DATA = 'SET_TIMER_DATA'
export const SET_SYNC_DATA = 'SET_SYNC_DATA'
export const SWITCH = 'SWITCH'
export const TIMER_ADJUST = 'TIMER_ADJUST'
export const TIMER_STARTPAUSE = 'TIMER_STARTPAUSE'
export const TIMER_CANCEL = 'TIMER_CANCEL'

export const OUTLET_SWITCH_CHANNEL = 'OUTLET_SWITCH_CHANNEL'
export const OUTLET_TIMER_CHANNEL = 'OUTLET_TIMER_CHANNEL'
export const OUTLET_SYNC_CHANNEL = 'OUTLET_SYNC_CHANNEL'

interface SetSwitchDataAction {
  type: typeof SET_SWITCH_DATA
  payload: {
    switchData: SwitchData
  }
}

interface SetTimerDataAction {
  type: typeof SET_TIMER_DATA
  payload: {
    timerData: TimerData
  }
}

interface SetSyncDataAction {
  type: typeof SET_SYNC_DATA
  payload: {
    syncData: GroupsData
  }
}

interface SetSwitchesAction {
  type: typeof SET_SWITCH_DATA
  payload: {
    switchData: SwitchData
  }
}

interface SwitchAction {
  type: typeof SWITCH
  payload: {
    group: string
    mode: boolean
  }
}

interface TimerAdjustAction {
  type: typeof TIMER_ADJUST
  payload: {
    group: string
    timerDataValues: TimerDataValues
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
  | SetSwitchDataAction
  | SetTimerDataAction
  | SetSyncDataAction
  | SetSwitchesAction
  | SwitchAction
  | TimerAdjustAction
  | TimerStartPauseAction
  | TimerCancelAction
