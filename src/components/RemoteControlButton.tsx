import * as React from 'react'
import './RemoteControlButton.css'
interface RemoteControlButtonProps {
  className?: string
  active?: boolean | undefined
  enabled?: boolean // defaults to true, see below
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  size?: 'medium' // 'small' | 'medium' | 'large' // TODO ** implement
}

export const RemoteControlButton: React.FunctionComponent<RemoteControlButtonProps> = props => {
  const enabled: boolean = props.enabled === undefined || props.enabled
  let handleClick: any
  if (enabled) {
    handleClick = props.handleClick
  } else {
    handleClick = () => {}
  }
  let btnClass = props.className !== undefined ? props.className : ''
  btnClass += ' remote-control-button medium-button' // No CSS for this yet *** TODO
  if (props.active) {
    btnClass += ' activeButton'
  }
  if (!enabled) {
    btnClass += ' disabledButton'
  }
  return (
    // see: https://github.com/JedWatson/classnames for nicer approach TODO ****
    <button className={btnClass} onClick={handleClick}>
      {props.children}
    </button>
  )
}
