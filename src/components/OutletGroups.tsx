import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import {
  groupsSettings,
  GroupSetting,
  Mode,
  TimerButtonAction,
} from '../settings/group-settings'

const OUTLET_SWITCH_CHANNEL = 'OUTLET_SWITCH_CHANNEL'

interface SwitchDataValues {
  mode: boolean
}

// The switch data can have multiple outletgroups
interface SwitchData {
  [group: string]: SwitchDataValues
}

// The timer data can have multiple outletgroups
interface TimerDataValues {
  time: number
  isTimerRunning: boolean
}

type OutletDataValues = SwitchDataValues & TimerDataValues // ***** LEARN

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
// LEARN ****
// type OmitGroup<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type SocketData = OmitGroup<GroupSocketData, 'group'>

// https://www.educba.com/typescript-type-vs-interface/
// type used here, because it's easier to read than interface
// interface OutletData extends Array<OutletDataValues> {}
type OutletData = {
  [group: string]: OutletDataValues
}

interface OutletGroupsProps {}

interface OutletGroupsState {
  OutletData: OutletData
}

class OutletGroups extends React.Component<
  OutletGroupsProps,
  OutletGroupsState
> {
  private socket: SocketIOClient.Socket | null
  constructor(props: OutletGroupsProps) {
    super(props)
    this.handleOnOffClick = this.handleOnOffClick.bind(this)
    this.setModeState = this.setModeState.bind(this) // (I don't think this is needed **** check)
    this.socket = null
    const OutletData: OutletData = {}
    groupsSettings.forEach((element, index) => {
      if (element.enabled) {
        OutletData[element.group] = {
          mode: false,
          time: element.defaultTimer,
          isTimerRunning: false, // TODO
        }
      }
    })
    this.state = { OutletData }
  }

  public componentDidMount() {
    // TODO: Move socket/io('htt..... out of component: always have this connection?
    // then pass it into the props...?  ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding.
    this.socket.on(OUTLET_SWITCH_CHANNEL, (switchData: SwitchData) => {
      this.setModeState(switchData)
    })
  }

  private setModeState(switchData: SwitchData) {
    const mergedOutletGoupsData: OutletData = {}
    for (const group in switchData) {
      mergedOutletGoupsData[group] = {
        ...this.state.OutletData[group],
        mode: switchData[group].mode,
      }
    }
    this.setState({
      ...this.state, // added for future proofing
      OutletData: {
        ...this.state.OutletData,
        ...mergedOutletGoupsData,
      },
    })
  }

  private handleOnOffClick(group: string, mode: Mode) {
    const switchData: SwitchData = {
      [group]: { mode },
    }
    if (this.socket) {
      this.socket.emit('OUTLET_SWITCH_CHANNEL', switchData)
    }
    this.setModeState(switchData)
    console.log(`Button clicked: ${group} - ${mode}`)
  }

  private handleTimerClick(group: string, action: TimerButtonAction) {
    console.log('TODO ***** IMPLEMENT HANDLING THE TIMER CLICK')
    console.log(`group: ${group} action: ${action}`)
  }

  render() {
    const groups = groupsSettings
      .filter(groupSetting => groupSetting.enabled)
      .map((groupSetting: GroupSetting): any => {
        return (
          <Group
            key={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={this.state.OutletData[groupSetting.group].mode}
            defaultTimer={this.state.OutletData[groupSetting.group].time}
            handleOnOffClick={(mode: Mode) =>
              this.handleOnOffClick(groupSetting.group, mode)
            }
            handleTimerClick={(action: TimerButtonAction) =>
              this.handleTimerClick(groupSetting.group, action)
            }
          />
        )
      })
    return groups
  }
}

export default OutletGroups
