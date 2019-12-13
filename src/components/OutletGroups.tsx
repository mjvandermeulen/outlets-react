import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import { groupsSettings, GroupSetting, Mode } from '../settings/group-settings'
import {
  TimerButtonAction,
  MINUSMINUS,
  PLUSPLUS,
  PLUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
  TOGGLEDISPLAY,
  timerAdjustments,
} from '../settings/timer-settings'
import { TimerDisplayProps } from './TimerDisplay'

const OUTLET_SWITCH_CHANNEL = 'OUTLET_SWITCH_CHANNEL'
const OUTLET_TIMER_CHANNEL = 'OUTLET_TIMER_CHANNEL'

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

interface TimerData {
  [group: string]: TimerDataValues
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
  outletData: OutletData
  userSettings: {
    showTimer: boolean
  }
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
    const outletData: OutletData = {}
    groupsSettings.forEach((element, index) => {
      if (element.enabled) {
        outletData[element.group] = {
          mode: false,
          time: element.defaultTimer,
          isTimerRunning: false, // TODO
        }
      }
    })
    this.state = {
      outletData,
      userSettings: {
        showTimer: true,
      },
    }
  }

  public componentDidMount() {
    // TODO: Move socket/io('htt..... out of component: always have this connection?
    // then pass it into the props...?  ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding.
    this.socket.on(OUTLET_SWITCH_CHANNEL, (switchData: SwitchData) => {
      this.setModeState(switchData)
    })
    this.socket.on(OUTLET_TIMER_CHANNEL, (timerData: TimerData) => {
      this.setTimerState(timerData)
      console.log('here')
    })
  }

  private setModeState(switchData: SwitchData) {
    const mergedOutletGoupsData: OutletData = {}
    for (const group in switchData) {
      mergedOutletGoupsData[group] = {
        ...this.state.outletData[group],
        mode: switchData[group].mode,
      }
    }
    this.setState({
      ...this.state, // added for future proofing
      outletData: {
        ...this.state.outletData,
        ...mergedOutletGoupsData,
      },
    })
  }

  private handleOnOffClick(group: string, mode: Mode) {
    const switchData: SwitchData = {
      [group]: { mode },
    }
    if (this.socket) {
      this.socket.emit(OUTLET_SWITCH_CHANNEL, switchData) // or broadcast?
    }
    this.setModeState(switchData)
    console.log(`Button clicked: ${group} - ${mode}`)
  }

  private broadcastTimer(timerData: TimerData) {
    console.log(`broadcast timerData: JSON: ${JSON.stringify(timerData)}`)
    if (this.socket) {
      this.socket.emit(OUTLET_TIMER_CHANNEL, timerData)
    }
  }

  private setTimerState(timerData: TimerData) {
    const mergedOutletGoupsData: OutletData = {}
    for (const group in timerData) {
      mergedOutletGoupsData[group] = {
        ...this.state.outletData[group],
        time: timerData[group].time,
        isTimerRunning: timerData[group].isTimerRunning,
      }
    }
    this.setState({
      ...this.state, // added for future proofing
      outletData: {
        ...this.state.outletData,
        ...mergedOutletGoupsData,
      },
    })
  }
  private changeTimer(group: string, milliseconds: number) {
    let time = this.state.outletData[group].time
    if (time == 0) {
      time = Date.now()
    }
    time += milliseconds
    const timerData: TimerData = {
      [group]: {
        isTimerRunning: this.state.outletData[group].isTimerRunning,
        time,
      },
    }
    this.broadcastTimer(timerData)
    this.setTimerState(timerData)
  }

  private handleTimerClick(group: string, action: TimerButtonAction) {
    // console.log('TODO ***** IMPLEMENT HANDLING THE TIMER CLICK')
    // console.log(`group: ${group} action: ${action}`)
    switch (action) {
      case MINUSMINUS:
        console.log(`IMPLEMENT ${MINUSMINUS}`)
        break
      case MINUS:
        console.log(`IMPLEMENT ${MINUS}`)
        break
      case PLUS:
        console.log(`IMPLEMENT ${PLUS}`)
        this.changeTimer(group, timerAdjustments.plus)
        break
      case PLUSPLUS:
        console.log(`IMPLEMENT ${PLUSPLUS}`)
        break
      case STARTPAUSE:
        console.log(`IMPLEMENT ${STARTPAUSE}`)
        break
      case CANCEL:
        console.log(`IMPLEMENT ${CANCEL}`)
        break
      case TOGGLEDISPLAY:
        console.log(`IMPLEMENT ${TOGGLEDISPLAY}`)
        break

      default:
        break
    }
  }

  render() {
    const groups = groupsSettings
      .filter(groupSetting => groupSetting.enabled)
      .map((groupSetting: GroupSetting): any => {
        return (
          <Group
            key={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={this.state.outletData[groupSetting.group].mode}
            defaultTimer={this.state.outletData[groupSetting.group].time}
            handleOnOffClick={(mode: Mode) =>
              this.handleOnOffClick(groupSetting.group, mode)
            }
            time={this.state.outletData[groupSetting.group].time}
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
