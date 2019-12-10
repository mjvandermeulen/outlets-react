export interface GroupSetting {
  group: string
  displayName: string
  defaultTimer: number
  enabled: boolean
}

export type Mode = boolean // 'on' | 'off' | 'unknown' TODO maybe?
export type TimerButtonAction =
  | 'plus'
  | 'plusplus'
  | 'minus'
  | 'minusminus'
  | 'startPause'
  | 'cancel'
  | 'toggleDisplay'

// LEARN ***
// export interface GroupsSettings extends Array<GroupSetting> {}
// OR
export type GroupsSettings = GroupSetting[]

export const groupsSettings: GroupsSettings = [
  {
    group: 'livingroom',
    displayName: 'Living Room',
    defaultTimer: 0,
    enabled: false,
  },
  {
    group: 'officelight',
    displayName: 'Office Light',
    defaultTimer: 0,
    enabled: true,
  },
  {
    group: 'coffee',
    displayName: 'Coffee',
    defaultTimer: 45 * 60 * 1000,
    enabled: true,
  },
  { group: 'fan', displayName: 'Office Fan', defaultTimer: 0, enabled: false },
  {
    group: 'guestlight',
    displayName: 'Guest Light',
    defaultTimer: 0,
    enabled: false,
  },
  {
    group: 'redlight',
    displayName: 'Guest Night Light',
    defaultTimer: 0,
    enabled: true,
  },
]
