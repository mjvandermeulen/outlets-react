import * as React from 'react'
import moment from 'moment'
// tools
import { bothTrueOrBothFalse } from '../tools/calculations'
// css
import './TimerDisplay.css'

export interface OwnProps {
  time: number // milliseconds since epoch OR if paused: time left in ms
  isTimerRunning: boolean
  showTimer: boolean
}

export class TimerDisplay extends React.Component<OwnProps, {}> {
  private displayInterval: NodeJS.Timeout | null

  constructor(props: OwnProps) {
    super(props)
    this.displayInterval = null
  }

  componentDidMount() {
    const { showTimer, isTimerRunning } = this.props
    this.displayInterval = setInterval(() => {
      if (bothTrueOrBothFalse(showTimer, isTimerRunning)) {
        this.forceUpdate()
      }
    }, 1000)
  }

  componentWillUnmount() {
    if (this.displayInterval) {
      clearInterval(this.displayInterval)
    }
  }

  private readableTimeRemaining(): string {
    let milliSecondsLeft = 0
    const { time, isTimerRunning } = this.props

    // timers in the past are displayed as zeros
    // so a reset timer (= 0) is displayed as zeros as well
    function two(number: number) {
      if (number < 10) {
        return '0' + number.toString()
      } else {
        return number.toString()
      }
    }

    if (!isTimerRunning) {
      milliSecondsLeft = time
    } else {
      milliSecondsLeft = time - Date.now()
      if (milliSecondsLeft < 0) {
        milliSecondsLeft = 0
      }
    }
    const hours = Math.floor(milliSecondsLeft / (60 * 60 * 1000))
    milliSecondsLeft -= hours * 60 * 60 * 1000
    const minutes = Math.floor(milliSecondsLeft / (60 * 1000))
    milliSecondsLeft -= minutes * 60 * 1000
    const secondsLeft = Math.floor(milliSecondsLeft / 1000)
    const blinker = secondsLeft % 2 === 0 ? ':' : ' '
    if (hours * 60 + minutes < 10) {
      return `${two(minutes)}:${two(secondsLeft)}`
    } else {
      return `${two(hours)}${blinker}${two(minutes)}`
    }
  }

  private readableSetTime(): string {
    const { time, isTimerRunning } = this.props
    let displayTime = time
    if (!isTimerRunning) {
      if (time <= 0) {
        return 'timer not set'
      } else {
        displayTime += Date.now()
      }
    } else {
      if (time <= Date.now()) {
        return 'timer not set'
      }
    }
    return moment(displayTime).format('ddd hh:mm:ss a')
  }

  render() {
    const { showTimer } = this.props
    let display = ''
    if (showTimer) {
      display = this.readableTimeRemaining()
    } else {
      display = this.readableSetTime()
    }
    return <div className="timer-display">{display}</div>
  }
}
