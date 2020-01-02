import * as React from 'react'
import moment from 'moment'
import './TimerDisplay.css'

export interface TimerDisplayProps {
  time: number // milliseconds since epoch OR if paused: time left in ms
  isTimerRunning: boolean
  showTimer: boolean
}

export class TimerDisplay extends React.Component<TimerDisplayProps, {}> {
  private displayInterval: NodeJS.Timeout | null

  constructor(props: TimerDisplayProps) {
    super(props)
    this.displayInterval = null
  }

  componentDidMount() {
    function exclusiveOr(a: boolean, b: boolean): boolean {
      return (a && !b) || (!a && b)
    }

    this.displayInterval = setInterval(() => {
      if (exclusiveOr(!this.props.isTimerRunning, this.props.showTimer)) {
        this.forceUpdate()
      }
    }, 1000)
  }

  componentWillUnmount() {
    if (this.displayInterval) {
      clearInterval(this.displayInterval)
    }
  }

  private readableTimeRemaining(
    milliseconds: number,
    isTimerRunning: boolean
  ): string {
    let milliSecondsLeft = 0

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
      milliSecondsLeft = milliseconds
    } else {
      milliSecondsLeft = milliseconds - Date.now()
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

  private readableSetTime(time: number, isTimerRunning: boolean): string {
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
    let display = ''
    if (this.props.showTimer) {
      // Show timer
      display = this.readableTimeRemaining(
        this.props.time,
        this.props.isTimerRunning
      )
    } else {
      // Show set time
      display = this.readableSetTime(this.props.time, this.props.isTimerRunning)
    }
    return <div className="timer-display">{display}</div>
  }
}
