import React from 'react'
import { Group } from './Group'
import { groupsSettings } from './settings/group-settings'

class OutletGroups extends React.Component {
  render() {
    const groups = []
    for (const group in groupsSettings) {
      if (groupsSettings[group].enabled) {
        groups.push(
          <Group
            key={group}
            groupName={group}
            displayName={groupsSettings[group].displayName}
            defaultTimer={1000}
          />
        )
      }
    }
    return groups
  }
}

export default OutletGroups
