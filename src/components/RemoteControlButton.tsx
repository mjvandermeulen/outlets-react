import * as React from 'react'
import './RemoteControlButton.css'
interface RemoteControlButtonProps {
  active: boolean
  enabled: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  size: 'medium' // 'small' | 'medium' | 'large'
}

export const RemoteControlButton: React.FunctionComponent<RemoteControlButtonProps> = props => {
  let handleClick: any
  if (props.enabled) {
    handleClick = props.handleClick
  } else {
    handleClick = () => {
      console.log('button disabled')
    }
  }
  let btnClass = 'medium-button'
  if (props.active) {
    btnClass += ' activeButton'
  }
  if (!props.enabled) {
    btnClass += ' disabledButton'
  }
  return (
    // see: https://github.com/JedWatson/classnames for nicer approach TODO
    <button className={btnClass} onClick={handleClick}>
      {props.children}
    </button>
  )
}
