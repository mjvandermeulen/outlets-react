export interface GroupSetting {
  displayName: string
  defaultTimer: number
  enabled: boolean
  codes?: string[]
}

export type GroupSettingWithGroup = { group: string } & GroupSetting
type GroupSettingsArray = GroupSettingWithGroup[]

export type Mode = boolean // 'on' | 'off' | 'unknown' TODO maybe?

export type GroupsSettings = { [group: string]: GroupSetting }

export function getGroupSetting(group: string): GroupSetting | null {
  if (groupsSettings[group] && groupsSettings[group].enabled) {
    return groupsSettings[group]
  }
  return null
}

export const groupsSettings: GroupsSettings = {
  livingroom: {
    displayName: 'Living Room',
    defaultTimer: 0,
    enabled: false,
  },
  officelight: {
    displayName: 'Office',
    defaultTimer: 0,
    enabled: true,
  },
  coffee: {
    displayName: 'Coffee',
    defaultTimer: 45 * 60 * 1000,
    enabled: true,
    codes: ['bogus 1', 'bogus2'],
  },
  fan: {
    displayName: 'Office Fan',
    defaultTimer: 0,
    enabled: false,
  },
  guestlight: {
    displayName: 'Guest Light',
    defaultTimer: 0,
    enabled: false,
  },
  redlight: {
    displayName: 'Night Light',
    defaultTimer: 0,
    enabled: true,
  },
}

export const enabledGroupSettingsArray: GroupSettingsArray = []
for (const group in groupsSettings) {
  if (groupsSettings[group].enabled) {
    const valueWithGroup: GroupSettingWithGroup = {
      ...groupsSettings[group],
      group,
    }
    enabledGroupSettingsArray.push(valueWithGroup)
  }
}

export const enabledGroupKeys: string[] = []
for (const group in groupsSettings) {
  if (groupsSettings[group].enabled) {
    enabledGroupKeys.push(group)
  }
}
