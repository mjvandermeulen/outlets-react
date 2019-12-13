import * as React from 'react'
import moment from 'moment'

export interface TimerDisplayProps {
  time: number // milliseconds since epoch OR if paused: time left in millis
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

  render() {
    // console.log('render')
    const secondsSinceConstruct = Math.round(
      (Date.now() - this.constructedTime) / 1000
    )
    return (
      <span>
        {moment(this.props.time).format('ddd hh:mm:ss a')} &{' '}
        {secondsSinceConstruct}
      </span>
    )
  }
}
