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
  handleOnOffClick: (event: React.MouseEvent, mode: Mode) => void
  handleExpandGroup: () => void
  time: number
  isTimerRunning: boolean
  expandGroup: boolean
  showTimer: boolean
  handleTimerClick: (action: TimerButtonAction) => void
}

// TODO: why not change to functional component?
export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <li className="accordion-list__item">
        <div
          className={`accordion-item ${!this.props.expandGroup &&
            'accordion-item--closed'}`}
        >
          <div
            className="accordion-item__line"
            onClick={this.props.handleExpandGroup}
          >
            <h3 className="accordion-item__title">{this.props.displayName}</h3>
          </div>
          <div className="accordion-item__inner">
            <div
              className={`accordion-item__content ${this.props.displayName ===
                'Coffee' && 'bounce'}`}
            >
              <div>
                <RemoteControlButton
                  enabled={true}
                  active={this.props.mode}
                  handleClick={event =>
                    this.props.handleOnOffClick(event, true)
                  }
                  size="medium"
                >
                  On
                </RemoteControlButton>
                <RemoteControlButton
                  enabled={true}
                  active={!this.props.mode}
                  handleClick={event =>
                    this.props.handleOnOffClick(event, false)
                  }
                  // TODO ******* see one above
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
                  handleClick={event =>
                    this.props.handleTimerClick(TOGGLEDISPLAY)
                  }
                  size="medium"
                >
                  {this.props.showTimer ? 'show set time' : 'show timer'}
                </RemoteControlButton>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
