import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import { groupsSettings, Mode } from '../settings/group-settings'

// TODO This is the real interface
// interface SocketData {
//   // TODO: MOVE &
//   // 'outlet_switch'; 'outlet_timer' ; 'outlet_sync_request';
//   group: string
//   mode: boolean
// }
// TODO remove test interface:
interface SocketData {
  group: string
  sync: boolean
  mode: boolean
  timer: number
}
interface OutletGroupsProps {}

class OutletGroups extends React.Component<OutletGroupsProps, {}> {
  private socket: SocketIOClient.Socket | null
  constructor(props: OutletGroupsProps) {
    super(props)
    this.handleOnOffClick = this.handleOnOffClick.bind(this)
    this.socket = null
  }

  public componentDidMount() {
    // TODO: Move socket/io('htt..... out of component: always have this connection? ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding.
    this.socket.on('light', (socketData: SocketData) => {
      console.log(`Received: ${socketData}`)
      // const newState = ...this.state
      this.setState({})
    })
  }

  private handleOnOffClick(group: string, mode: Mode) {
    const socketData: SocketData = {
      group: 'officelight',
      sync: false,
      mode: true,
      timer: -1,
    }
    if (this.socket) {
      this.socket.emit('light', socketData)
    }

    console.log(`Button clicked: ${group} - ${mode}`)
  }

  render() {
    const groups = []
    for (const group in groupsSettings) {
      if (groupsSettings[group].enabled) {
        groups.push(
          <Group
            key={group}
            groupName={group}
            displayName={groupsSettings[group].displayName}
            defaultTimer={1000}
            handleOnOffClick={(group: string, mode: Mode) =>
              this.handleOnOffClick(group, mode)
            }
          />
        )
      }
    }
    return groups
  }
}

export default OutletGroups
