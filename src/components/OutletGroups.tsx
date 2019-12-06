import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import { groupsSettings, Mode } from '../settings/group-settings'

// TODO This is the real interface
// interface SocketSwitchData {
//   // TODO: MOVE &
//   // 'outlet_switch'; 'outlet_timer' ; 'outlet_sync_request';
//   group: string
//   mode: boolean
// }
// TODO remove test interface:
interface SocketSwitchData {
  // this is ambiguous:
  // how to know if mode needs to be changed?
  // currently: if sync || timer < 0 UGLY
  // TODO *** split in different socket channels?
  group: string
  sync: boolean
  mode: boolean
  timer: number
}

interface SocketTimerData {
  timer: number // 0 after reset
  mode: boolean
}

interface SocketSyncData {
  [key: string]: {
    // the key is the groupname
    mode: boolean
    timer: number
  }
}

interface OutletGroupsProps {}

interface OutletGroupState {
  outletsState: SocketSyncData
}

class OutletGroups extends React.Component<
  OutletGroupsProps,
  OutletGroupState
> {
  private socket: SocketIOClient.Socket | null
  constructor(props: OutletGroupsProps) {
    super(props)
    this.handleOnOffClick = this.handleOnOffClick.bind(this)
    this.socket = null
    const outletsState: SocketSyncData = {}
    for (const group in groupsSettings) {
      if (groupsSettings[group].enabled) {
        outletsState[group] = {
          mode: false,
          timer: groupsSettings[group].defaultTimer,
        }
      }
    }
    this.state = { outletsState }
  }

  public componentDidMount() {
    // TODO: Move socket/io('htt..... out of component: always have this connection? ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding.
    this.socket.on('light', (socketSwitchData: SocketSwitchData) => {
      console.log(`Received: ${socketSwitchData}`)
      // TODO play with this to dumb it down and see where it breaks.
      this.setState({
        ...this.state, // future proofing
        outletsState: {
          ...this.state.outletsState,
          [socketSwitchData.group]: {
            mode: socketSwitchData.mode,
            timer: this.state.outletsState[socketSwitchData.group].timer,
          },
        },
      })
      //   {
      //   ...this.state,
      //   outletsState: {
      //     ...this.state.outletsState,
      //     [socketSwitchData.group]: socketSwitchData.mode,
      //   },
      // }
    })
  }

  private handleOnOffClick(group: string, mode: Mode) {
    const socketData: SocketSwitchData = {
      group,
      mode,
      timer: -1,
      sync: false,
    }
    if (this.socket) {
      this.socket.emit('light', socketData)
    }
    this.setState({
      ...this.state,
      outletsState: {
        ...this.state.outletsState,
        [group]: {
          mode,
          timer: this.state.outletsState[group].timer,
        },
      },
    })
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
            mode={this.state.outletsState[group].mode}
            defaultTimer={this.state.outletsState[group].timer}
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
