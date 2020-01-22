import * as React from 'react'
import './RemoteControlButton.css'
import classNames from 'classnames'
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
  const btnClasses = classNames(
    props.className,
    'remote-control-button',
    'medium-button',
    { activeButton: props.active },
    { disabledButton: !enabled }
  )

  return (
    <button className={btnClasses} onClick={handleClick}>
      {props.children}
    </button>
  )
}
