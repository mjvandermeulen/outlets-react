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
  const { active, className, handleClick, children } = props
  let onClick: any
  if (enabled) {
    onClick = handleClick
  } else {
    onClick = () => {}
  }
  const btnClasses = classNames(
    className,
    'remote-control-button',
    'medium-button',
    { '--active': active },
    { '--disabled': !enabled }
  )

  return (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  )
}
