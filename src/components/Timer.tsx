import * as React from 'react'

import './Timer.css'
import { RemoteControlButton } from './RemoteControlButton'
import {
  PLUSPLUS,
  PLUS,
  MINUSMINUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
  TimerButtonTask,
  timerAdjustments,
} from '../settings/timer-settings'
import { TimerDisplay } from './TimerDisplay'
import { TimerDataValues } from '../redux/outlets/types'

interface Props {
  handleTimerDataValues: any
  time: number
  isTimerRunning: boolean
  defaultTimer: number
}

interface State {
  showTimer: boolean
}

export class Timer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showTimer: true,
    }
  }
  private toggleShowTimer(): void {
    this.setState(state => {
      return { showTimer: !state.showTimer }
    })
  }

  private toggleStartPauseTimer(): TimerDataValues {
    const { time, isTimerRunning } = this.props
    if (isTimerRunning) {
      return {
        time: time - Date.now(), // time left
        isTimerRunning: false,
      }
    }
    return {
      time: Date.now() + time, // now + time left
      isTimerRunning: true,
    }
  }

  private calcNewTime(msAdjustment: number): TimerDataValues {
    const { time, isTimerRunning } = this.props
    const { showTimer } = this.state
    let newTime = time + msAdjustment
    const increment = timerAdjustments.plus
    if (!isTimerRunning && newTime < 0) {
      newTime = 0
    }
    // // BEFORE ROUNDING
    // // running AND showTimer => SUBTRACT Date.now()
    // // running AND !showTimer => nothing
    // // !running AND showTimer => nothing
    // // !running AND !showTimer => ADD Date.now()
    if (isTimerRunning && showTimer) {
      newTime -= Date.now()
    } else if (!isTimerRunning && !showTimer) {
      newTime += Date.now()
    }
    // NOTE: You don't have to distinguish between showTimer or not showTimer
    if (msAdjustment > 0) {
      newTime = Math.floor(newTime / increment) * increment
    } else {
      newTime = Math.ceil((newTime - 999) / increment) * increment
    }
    if (isTimerRunning && showTimer) {
      newTime += Date.now()
    } else if (!isTimerRunning && !showTimer) {
      newTime -= Date.now()
    }
    if (isTimerRunning && showTimer) {
      // Time for user to mentally process what just happened
      newTime += 999
    }
    return {
      time: newTime,
      isTimerRunning,
    }
  }
  private cancelTimer(): TimerDataValues {
    return {
      time: this.props.defaultTimer,
      isTimerRunning: false,
    }
  }

  private handleTimerTask(task: TimerButtonTask): void {
    const { time, isTimerRunning, handleTimerDataValues } = this.props
    let timerDataValues: TimerDataValues = {
      time: time,
      isTimerRunning: isTimerRunning,
    }
    switch (task) {
      case MINUSMINUS:
        timerDataValues = this.calcNewTime(timerAdjustments.minusminus)
        break
      case MINUS:
        timerDataValues = this.calcNewTime(timerAdjustments.minus)
        break
      case PLUS:
        timerDataValues = this.calcNewTime(timerAdjustments.plus)
        break
      case PLUSPLUS:
        timerDataValues = this.calcNewTime(timerAdjustments.plusplus)
        break
      case STARTPAUSE:
        timerDataValues = this.toggleStartPauseTimer()
        break
      case CANCEL:
        timerDataValues = this.cancelTimer()
        break
    }
    handleTimerDataValues(timerDataValues)
  }

  public render() {
    const { time, isTimerRunning, defaultTimer } = this.props
    const { showTimer } = this.state
    return (
      <div className="timer">
        <div className="timer__line timer__display-line">
          <RemoteControlButton
            handleClick={() => this.handleTimerTask(PLUSPLUS)}
          >
            ++
          </RemoteControlButton>
          <RemoteControlButton handleClick={() => this.handleTimerTask(PLUS)}>
            +
          </RemoteControlButton>
          <TimerDisplay
            time={time}
            isTimerRunning={isTimerRunning}
            showTimer={this.state.showTimer}
          />
          <RemoteControlButton
            enabled={time > 0}
            handleClick={() => this.handleTimerTask(MINUSMINUS)}
          >
            --
          </RemoteControlButton>
          <RemoteControlButton
            enabled={time > 0}
            handleClick={() => this.handleTimerTask(MINUS)}
          >
            -
          </RemoteControlButton>
        </div>
        <div className="timer__line">
          <RemoteControlButton
            enabled={isTimerRunning || time > 0}
            handleClick={() => this.handleTimerTask(STARTPAUSE)}
          >
            {isTimerRunning ? 'pause' : 'start'}
          </RemoteControlButton>
          <RemoteControlButton
            enabled={time !== defaultTimer}
            handleClick={() => this.handleTimerTask(CANCEL)}
          >
            cancel
          </RemoteControlButton>
          <RemoteControlButton handleClick={() => this.toggleShowTimer()}>
            {showTimer ? 'show set time' : 'show timer'}
          </RemoteControlButton>
        </div>
      </div>
    )
  }
}
