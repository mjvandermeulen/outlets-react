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

import './Group.css'
import { RootState } from '../redux/rootReducer'
import { UserSettingsActionTypes } from '../redux/userSettings/types'
import {
  toggleExpandAction,
  toggleShowTimerAction,
} from '../redux/userSettings/actions'
import { connect } from 'react-redux'

// interface StateProps {
//   expandGroup: boolean
//   showTimer: boolean
// }

// interface DispatchProps {
//   toggleExpand: UserSettingsActionTypes
//   toggleShowTimer: UserSettingsActionTypes
// }

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

interface OwnProps {
  group: string
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (event: React.MouseEvent, mode: Mode) => void
  handleExpandGroup: () => void
  time: number
  isTimerRunning: boolean
  handleTimerClick: (action: TimerButtonAction) => void
}

type Props = StateProps & DispatchProps & OwnProps

// LEARN: Use OwnProps to dig in and only use current Groups state
const mapState = (state: RootState, ownProps: OwnProps) => ({
  expandGroup: state.userSettings[ownProps.group].expandGroup,
  showTimer: state.userSettings[ownProps.group].showTimer,
})

const mapDispatch = {
  toggleExpand: toggleExpandAction,
  toggleShowTimer: toggleShowTimerAction,
}

class GroupComponent extends React.Component<Props> {
  render() {
    return (
      <li className="accordion-list__item">
        <div
          className={`accordion-item ${!this.props.expandGroup &&
            'accordion-item--closed'}`}
        >
          <div
            className="accordion-item__line"
            onClick={() => this.props.toggleExpand(this.props.group)}
          >
            <div className="accordion-item__line-content">
              <div className="accordion-item__title">
                {this.props.displayName}
              </div>
              {/* <div className="flex-media-small-break" /> */}
              <RemoteControlButton
                className={
                  `
                    button__caret
                    ${this.props.expandGroup ? '' : ' button__caret--down'}` +
                  `${
                    this.props.displayName === 'Coffee'
                      ? ' button__caret--bounce'
                      : ''
                  }`
                }
                enabled={true}
                active={this.props.expandGroup}
                handleClick={() => {}}
                size="medium"
              >
                <i className="caret" />
              </RemoteControlButton>
              <div className="accordion-item__line-on-off-buttons">
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
                  size="medium"
                >
                  Off
                </RemoteControlButton>
              </div>
            </div>
          </div>
          <div className="accordion-item__inner">
            <div
              className={`accordion-item__content ${this.props.displayName ===
                'Coffee' && 'bounce'}`}
            >
              <div className="timer">
                <div className="timer__line timer__display-line">
                  <RemoteControlButton
                    enabled={true}
                    active={false}
                    handleClick={event => this.props.handleTimerClick(PLUSPLUS)}
                    size="medium"
                  >
                    ++
                  </RemoteControlButton>
                  <RemoteControlButton
                    enabled={true}
                    active={false}
                    handleClick={event => this.props.handleTimerClick(PLUS)}
                    size="medium"
                  >
                    +
                  </RemoteControlButton>
                  <TimerDisplay
                    time={this.props.time}
                    isTimerRunning={this.props.isTimerRunning}
                    showTimer={this.props.showTimer}
                  />
                  <RemoteControlButton
                    enabled={this.props.time > 0}
                    active={false}
                    handleClick={event =>
                      this.props.handleTimerClick(MINUSMINUS)
                    }
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
                </div>
                <div className="timer__line">
                  <RemoteControlButton
                    enabled={this.props.isTimerRunning || this.props.time > 0}
                    active={false}
                    handleClick={event =>
                      this.props.handleTimerClick(STARTPAUSE)
                    }
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
                      // this.props.handleTimerClick(TOGGLEDISPLAY)
                      this.props.toggleShowTimer(this.props.group)
                    }
                    size="medium"
                  >
                    {this.props.showTimer ? 'show set time' : 'show timer'}
                  </RemoteControlButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export const Group = connect(mapState, mapDispatch)(GroupComponent)
