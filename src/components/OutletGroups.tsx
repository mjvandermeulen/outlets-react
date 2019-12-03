import * as React from 'react'
import { Group } from './Group'
import { groupsSettings, Mode } from '../settings/group-settings'

interface OutletGroupsProps {}

class OutletGroups extends React.Component<OutletGroupsProps, {}> {
  constructor(props: OutletGroupsProps) {
    super(props)
    this.handleOnOffClick = this.handleOnOffClick.bind(this)
  }

  private handleOnOffClick(group: string, mode: Mode) {
    console.log(`Button clicked: ${group} - ${mode}`)
  }

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
            handleOnOffClick={(group: string, mode: Mode) =>
              this.handleOnOffClick(group, mode)
            }
          />
        )
      }
    }
    return groups
  }
}

export default OutletGroups
