import * as React from 'react'

interface RemoteControlButtonProps {
  size: 'medium' // 'small' | 'medium' | 'large'
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const RemoteControlButton: React.FunctionComponent<RemoteControlButtonProps> = props => {
  return (
    <button className="medium-button" onClick={props.handleClick}>
      {props.children}
    </button>
  )
}
