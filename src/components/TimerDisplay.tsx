import * as React from 'react'
import moment from 'moment'
import './TimerDisplay.css'

export interface TimerDisplayProps {
  time: number // milliseconds since epoch OR if paused: time left in ms
  showTimer: boolean
}

export class TimerDisplay extends React.Component<TimerDisplayProps, {}> {
  private displayInterval: NodeJS.Timeout | null
  private constructedTime: number

  constructor(props: TimerDisplayProps) {
    super(props)
    this.displayInterval = null
    this.constructedTime = Date.now()
  }

  componentDidMount() {
    this.displayInterval = setInterval(() => {
      this.forceUpdate()
    }, 1000)
  }

  componentWillUnmount() {
    if (this.displayInterval) {
      clearInterval(this.displayInterval)
    }
  }

  private readableTimeRemaining(milliseconds: number): string {
    // timers in the past are displayed as zeros
    // so a reset timer (= 0) is displayed as zeros as well
    function two(number: number) {
      if (number < 10) {
        return '0' + number.toString()
      } else {
        return number.toString()
      }
    }
    let milliSecondsLeft = milliseconds - Date.now()
    if (milliSecondsLeft < 0) {
      milliSecondsLeft = 0
    }
    const hours = Math.floor(milliSecondsLeft / (60 * 60 * 1000))
    milliSecondsLeft = milliSecondsLeft % (60 * 60 * 1000)
    const minutes = Math.floor(milliSecondsLeft / (60 * 1000))
    milliSecondsLeft %= 60 * 1000
    const secondsLeft = Math.floor(milliSecondsLeft / 1000)
    const blinker = secondsLeft % 2 == 0 ? ':' : ' '
    if (minutes < 10) {
      return `${two(minutes)}:${two(secondsLeft)}`
    } else {
      return `${two(hours)}${blinker}${two(minutes)}`
    }
  }

  render() {
    let display = ''
    const secondsSinceConstruct = Math.round(
      (Date.now() - this.constructedTime) / 1000
    )
    if (this.props.showTimer) {
      display = this.readableTimeRemaining(this.props.time)
    } else {
      display = moment(this.props.time).format('ddd hh:mm:ss a')
    }
    return (
      <span className="timer">
        {display}
        {/* & {secondsSinceConstruct} */}
      </span>
    )
  }
}
