import * as React from 'react'
import { TimerDisplay } from './TimerDisplay'
import { RemoteControlButton } from './RemoteControlButton'
import { Mode } from '../settings/group-settings'
import {
  TimerButtonAction,
  MINUSMINUS,
  PLUSPLUS,
  PLUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
  TOGGLEDISPLAY,
} from '../settings/timer-settings'

export interface GroupProps {
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (mode: Mode) => void
  time: number
  isTimerRunning: boolean
  showTimer: boolean
  handleTimerClick: (action: TimerButtonAction) => void
}

// TODO: why not change to functional component?
export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div>
        <h3>{this.props.displayName}</h3>
        <div>
          <RemoteControlButton
            enabled={true}
            active={this.props.mode}
            handleClick={event => this.props.handleOnOffClick(true)}
            size="medium"
          >
            On
          </RemoteControlButton>
          <RemoteControlButton
            enabled={true}
            active={!this.props.mode}
            handleClick={event => this.props.handleOnOffClick(false)}
            size="medium"
          >
            Off
          </RemoteControlButton>
        </div>
        <div>
          <RemoteControlButton
            enabled={this.props.time > 0}
            active={false}
            handleClick={event => this.props.handleTimerClick(MINUSMINUS)}
            size="medium"
          >
            --
          </RemoteControlButton>
          <RemoteControlButton
            enabled={this.props.time > 0}
            active={false}
            handleClick={event => this.props.handleTimerClick(MINUS)}
            size="medium"
          >
            -
          </RemoteControlButton>
          <TimerDisplay
            time={this.props.time}
            isTimerRunning={this.props.isTimerRunning}
            showTimer={this.props.showTimer}
          />
          <RemoteControlButton
            enabled={true}
            active={false}
            handleClick={event => this.props.handleTimerClick(PLUS)}
            size="medium"
          >
            +
          </RemoteControlButton>
          <RemoteControlButton
            enabled={true}
            active={false}
            handleClick={event => this.props.handleTimerClick(PLUSPLUS)}
            size="medium"
          >
            ++
          </RemoteControlButton>
        </div>
        <div>
          <RemoteControlButton
            enabled={this.props.isTimerRunning || this.props.time > 0}
            active={false}
            handleClick={event => this.props.handleTimerClick(STARTPAUSE)}
            size="medium"
          >
            {this.props.isTimerRunning ? 'pause' : 'start'}
          </RemoteControlButton>
          <RemoteControlButton
            enabled={this.props.time !== 0}
            active={false}
            handleClick={event => this.props.handleTimerClick(CANCEL)}
            size="medium"
          >
            cancel
          </RemoteControlButton>
          <RemoteControlButton
            enabled={true}
            active={false}
            handleClick={event => this.props.handleTimerClick(TOGGLEDISPLAY)}
            size="medium"
          >
            {this.props.showTimer ? 'show set time' : 'show timer'}
          </RemoteControlButton>
        </div>
      </div>
    )
  }
}
