import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import { groupsSettings, GroupSetting, Mode } from '../settings/group-settings'

interface OutletSwitchData {
  group: string
  mode: boolean
}

interface OutletTimerData {
  group: string
  time: number
  isTimerRunning: boolean
}

type OutletData = OutletSwitchData & OutletTimerData // ***** LEARN

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
// LEARN *****
// type OmitGroup<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type SocketData = OmitGroup<GroupSocketData, 'group'>

// https://www.educba.com/typescript-type-vs-interface/
// type used here, because it's easier to read than interface
// interface OutletGroupsData extends Array<OutletData> {}
type OutletGroupsData = OutletData[]
// for testing:
// const OGD: OutletGroupsData = [
//   { group: 'bogus', mode: false, isTimerRunning: false, time: 42 },
// ]

interface OutletGroupsProps {}

interface OutletGroupState {
  outletGroupsData: OutletGroupsData
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
    const outletGroupsData: OutletGroupsData = []
    groupsSettings.forEach((element, index) => {
      if (element.enabled) {
        outletGroupsData.push({
          group: element.group,
          mode: false,
          time: element.defaultTimer,
          isTimerRunning: false, // TODO
        })
      }
    })
    this.state = { outletGroupsData }
  }

  public componentDidMount() {
    // TODO: Move socket/io('htt..... out of component: always have this connection?
    // then pass it into the props...?  ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding.
    this.socket.on('light', (outletSwitchData: OutletSwitchData) => {
      console.log(`Received: ${outletSwitchData}`)
      this.setModeState(outletSwitchData)
    })
  }

  private setModeState(outletSwitchData: OutletSwitchData) {
    const newOutletsGroupsData: OutletGroupsData = this.state.outletGroupsData.map(
      outletData => {
        if (outletData.group === outletSwitchData.group) {
          outletData.mode = outletSwitchData.mode
        }
        return outletData
      }
    )
    this.setState({
      ...this.state, // added for future proofing
      outletGroupsData: newOutletsGroupsData,
    })
  }

  private handleOnOffClick(group: string, mode: Mode) {
    const outletSwitchData: OutletSwitchData = {
      group,
      mode,
    }
    if (this.socket) {
      this.socket.emit('light', outletSwitchData)
    }
    this.setModeState(outletSwitchData)
    console.log(`Button clicked: ${group} - ${mode}`)
  }

  render() {
    const groups = groupsSettings
      .filter(groupSetting => groupSetting.enabled)
      .map((groupSetting: GroupSetting): any => {
        // find the group in the state.outeletGroupsData array that matches the
        // current group.
        //      alternative I: in the contructor copy the group-settings to the state
        //      then loop over the state here.
        //      alternative II: turn state.outletGroupsData back into an object
        //      with groups as keys. (PREFERENCE dec 8 2019 mjvandermeulen,
        //      state as an array is not cool)
        const outletState: OutletData = this.state.outletGroupsData.filter(
          data => {
            return data.group === groupSetting.group
          }
        )[0]
        return (
          <Group
            key={groupSetting.group}
            groupName={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={outletState.mode}
            defaultTimer={outletState.time}
            handleOnOffClick={(group: string, mode: Mode) =>
              this.handleOnOffClick(group, mode)
            }
          />
        )
      })
    return groups
  }
}

export default OutletGroups
