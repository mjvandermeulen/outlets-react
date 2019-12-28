export interface GroupSettingValues {
  displayName: string
  defaultTimer: number
  enabled: boolean
}

export type GroupSetting = GroupSettingValues & {
  group: string
}

export type Mode = boolean // 'on' | 'off' | 'unknown' TODO maybe?

// LEARN ***
// export interface GroupsSettings extends Array<GroupSetting> {}
// OR
export type GroupsSettings = GroupSetting[]

export function getGroupSettingValues(
  group: string
): GroupSettingValues | null {
  for (const groupSetting of groupsSettings) {
    if (groupSetting.enabled && groupSetting.group === group) {
      return {
        displayName: groupSetting.displayName,
        defaultTimer: groupSetting.defaultTimer,
        enabled: groupSetting.enabled,
      }
    }
  }
  return null
}

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
  {
    group: 'fan',
    displayName: 'Office Fan',
    defaultTimer: 0,
    enabled: false,
  },
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
    enabled: false,
  },
]
