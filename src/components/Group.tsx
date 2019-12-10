import * as React from 'react'
import { RemoteControlButton } from './RemoteControlButton'
import { Mode, TimerButtonAction } from '../settings/group-settings'

export interface GroupProps {
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (mode: Mode) => void
  handleTimerClick: (action: TimerButtonAction) => void
}

export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div>
        <h3>{this.props.displayName}</h3>
        <div>
          <RemoteControlButton
            active={this.props.mode}
            handleClick={event => this.props.handleOnOffClick(true)}
            size="medium"
          >
            On
          </RemoteControlButton>
          <RemoteControlButton
            active={!this.props.mode}
            handleClick={event => this.props.handleOnOffClick(false)}
            size="medium"
          >
            Off
          </RemoteControlButton>
        </div>
        <div>
          <RemoteControlButton
            active={false}
            handleClick={event => this.props.handleTimerClick('minusminus')}
            size="medium"
          >
            --
          </RemoteControlButton>
        </div>
        <div>default Timer: {this.props.defaultTimer}</div>
      </div>
    )
  }
}
