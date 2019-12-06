import * as React from 'react'
import { RemoteControlButton } from './RemoteControlButton'
import { Mode } from '../settings/group-settings'

export interface GroupProps {
  groupName: string
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (group: string, mode: Mode) => void
}

export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div>
        <h3>{this.props.displayName}</h3>
        <div>
          <RemoteControlButton
            active={this.props.mode}
            handleClick={event =>
              this.props.handleOnOffClick(this.props.groupName, true)
            }
            size="medium"
          >
            On
          </RemoteControlButton>
          <RemoteControlButton
            active={!this.props.mode}
            handleClick={event =>
              this.props.handleOnOffClick(this.props.groupName, false)
            }
            size="medium"
          >
            Off
          </RemoteControlButton>
        </div>
        <div>default Timer: {this.props.defaultTimer}</div>
      </div>
    )
  }
}
