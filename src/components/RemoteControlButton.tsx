import * as React from 'react'
import './RemoteControlButton.css'
interface RemoteControlButtonProps {
  active: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  size: 'medium' // 'small' | 'medium' | 'large'
}

export const RemoteControlButton: React.FunctionComponent<RemoteControlButtonProps> = props => {
  // see: https://github.com/JedWatson/classnames for nicer approach TODO
  return (
    <button
      className={'medium-button ' + (props.active && 'activeButton')}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  )
}
