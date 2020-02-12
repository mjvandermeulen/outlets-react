interface SwitchDataValues {
  mode: boolean
}

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
// type OutletDataValues = SwitchDataValues & TimerDataValues // *** LEARN

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
// LEARN ***
// type OmitGroup<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type SocketData = OmitGroup<GroupSocketData, 'group'>

export interface GroupsData {
  [group: string]: OutletDataValues
}

export type OutletData = {
  groups: GroupsData
}

// actions
// TODO: switch to mirroredKeys... ****
export const PASS = 'PASS'
export const SET_SWITCH_DATA = 'SET_SWITCH_DATA'
export const SET_TIMER_DATA = 'SET_TIMER_DATA'
export const SET_SYNC_DATA = 'SET_SYNC_DATA'
export const TIMER_ADJUST = 'TIMER_ADJUST'
export const TIMER_STARTPAUSE = 'TIMER_STARTPAUSE'
export const TIMER_CANCEL = 'TIMER_CANCEL'

// Move to sockets somewhere... TODO ****
export const OUTLET_SWITCH_CHANNEL = 'OUTLET_SWITCH_CHANNEL'
export const OUTLET_TIMER_CHANNEL = 'OUTLET_TIMER_CHANNEL'
export const OUTLET_SYNC_CHANNEL = 'OUTLET_SYNC_CHANNEL'

interface SetSwitchDataAction {
  type: typeof SET_SWITCH_DATA
  payload: {
    data: SwitchData
  }
}

interface SetTimerDataAction {
  type: typeof SET_TIMER_DATA
  payload: {
    data: TimerData
  }
}

/**
 * Dispatched by middle ware when processing either:
 *   sendSyncRequestAction
 *   receiveSyncDataAction
 * PASS is used after sendSyncRequestAction (no further action is needed)
 */
interface SetSyncDataAction {
  type: typeof SET_SYNC_DATA | typeof PASS
  payload: {
    data: GroupsData
  }
}

export type OutletActionTypes =
  | SetSwitchDataAction
  | SetTimerDataAction
  | SetSyncDataAction
