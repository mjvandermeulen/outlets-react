import * as React from 'react'
import { connect } from 'react-redux'
// settings
import { Mode } from '../settings/group-settings'
import {
  TimerButtonTask,
  MINUSMINUS,
  PLUSPLUS,
  PLUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
} from '../settings/timer-settings'
// components
import { TimerDisplay } from './TimerDisplay'
import { RemoteControlButton } from './RemoteControlButton'
// types, action and reducers
import {
  toggleExpandAction,
  toggleShowTimerAction,
} from '../redux/userSettings/actions'
import { RootState } from '../redux/rootReducer'
// css
import './Group.css'
import classNames from 'classnames'

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

interface OwnProps {
  group: string
  codes: string[] | undefined
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (event: React.MouseEvent, mode: Mode) => void
  time: number
  isTimerRunning: boolean
  handleTimerClick: (action: TimerButtonTask) => void
}

type Props = StateProps & DispatchProps & OwnProps

// LEARN: Use OwnProps to dig in and only use current Groups state
const mapState = (state: RootState, ownProps: OwnProps) => ({
  expandGroup: state.userSettings.groups[ownProps.group].expandGroup,
  showTimer: state.userSettings.groups[ownProps.group].showTimer,
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
          className={classNames('accordion-item', {
            'accordion-item--closed': !this.props.expandGroup,
          })}
        >
          <div
            className="accordion-item__line"
            onClick={() => this.props.toggleExpand(this.props.group)}
          >
            <div className="accordion-item__line-content">
              <div className="accordion-item__title">
                {this.props.displayName}
              </div>
              <RemoteControlButton
                className={classNames(
                  'button__caret',
                  { 'button__caret--down': !this.props.expandGroup },
                  { 'button__caret--bounce': this.props.group === 'coffee' }
                )}
                active={false} // animate: use button__caret--down class
                handleClick={() => {}}
                size="medium"
              >
                <i className="caret" />
              </RemoteControlButton>
              <div className="accordion-item__line-on-off-buttons">
                <RemoteControlButton
                  active={this.props.mode}
                  handleClick={event =>
                    this.props.handleOnOffClick(event, true)
                  }
                  size="medium"
                >
                  On
                </RemoteControlButton>
                <RemoteControlButton
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
              className={classNames('accordion-item__content', {
                bounce: this.props.displayName === 'Coffee',
              })}
            >
              <div className="timer">
                <div className="timer__line timer__display-line">
                  <RemoteControlButton
                    handleClick={event => this.props.handleTimerClick(PLUSPLUS)}
                  >
                    ++
                  </RemoteControlButton>
                  <RemoteControlButton
                    handleClick={event => this.props.handleTimerClick(PLUS)}
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
                    handleClick={event =>
                      this.props.handleTimerClick(MINUSMINUS)
                    }
                  >
                    --
                  </RemoteControlButton>
                  <RemoteControlButton
                    enabled={this.props.time > 0}
                    handleClick={event => this.props.handleTimerClick(MINUS)}
                  >
                    -
                  </RemoteControlButton>
                </div>
                <div className="timer__line">
                  <RemoteControlButton
                    enabled={this.props.isTimerRunning || this.props.time > 0}
                    handleClick={event =>
                      this.props.handleTimerClick(STARTPAUSE)
                    }
                  >
                    {this.props.isTimerRunning ? 'pause' : 'start'}
                  </RemoteControlButton>
                  <RemoteControlButton
                    enabled={this.props.time !== this.props.defaultTimer}
                    handleClick={event => this.props.handleTimerClick(CANCEL)}
                  >
                    cancel
                  </RemoteControlButton>
                  <RemoteControlButton
                    handleClick={event =>
                      this.props.toggleShowTimer(this.props.group)
                    }
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
