import * as React from 'react'
import { RemoteControlButton } from './RemoteControlButton'
import { Mode } from '../settings/group-settings'

export interface GroupProps {
  groupName: string
  displayName: string
  defaultTimer: number // in milliseconds
  handleOnOffClick: (group: string, mode: Mode) => void
}

export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div>
        <div>
          Group with a name of {this.props.groupName}, displayName:{' '}
          {this.props.displayName} and timer set to {this.props.defaultTimer}
        </div>
        <div>
          <RemoteControlButton
            size="medium"
            handleClick={event =>
              this.props.handleOnOffClick(this.props.groupName, 'on')
            }
          >
            On
          </RemoteControlButton>
        </div>
      </div>
    )
  }
}
