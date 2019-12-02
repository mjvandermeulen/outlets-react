import React from 'react'

export interface GroupProps {
  groupName: string
  displayName: string
  defaultTimer: number // in milliseconds
}

export class Group extends React.Component<GroupProps, {}> {
  render() {
    return (
      <div>
        Group with a name of {this.props.groupName}, displayName:{' '}
        {this.props.displayName} and timer set to {this.props.defaultTimer}
      </div>
    )
  }
}
