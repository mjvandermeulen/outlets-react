import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import {
  groupsSettings,
  GroupSetting,
  Mode,
  getGroupSettingValues,
} from '../settings/group-settings'
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

import '../css/accordion.css' // TODO **** Move to Sass @use rule

// TODO *** move
const OUTLET_SWITCH_CHANNEL = 'OUTLET_SWITCH_CHANNEL'
const OUTLET_TIMER_CHANNEL = 'OUTLET_TIMER_CHANNEL'
const OUTLET_SYNC_CHANNEL = 'OUTLET_SYNC_CHANNEL'

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

type SyncRequestData = string[] // array of groups

interface OutletDataValues extends SwitchDataValues, TimerDataValues {}
// OR
// type OutletDataValues = SwitchDataValues & TimerDataValues // **** LEARN

// https://stackoverflow.com/questions/44983560/how-to-exclude-a-key-from-an-interface-in-typescript
// LEARN ***
// type OmitGroup<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type SocketData = OmitGroup<GroupSocketData, 'group'>

// https://www.educba.com/typescript-type-vs-interface/
// type used here, because it's easier to read than interface
// interface OutletData extends Array<OutletDataValues> {}
type OutletData = {
  [group: string]: OutletDataValues
}

interface OutletGroupsProps {}

interface UserSettings {
  [group: string]: {
    expandGroup: boolean
    showTimer: boolean
  }
}

interface OutletGroupsState {
  outletData: OutletData
  userSettings: UserSettings
}

class OutletGroups extends React.Component<
  OutletGroupsProps,
  OutletGroupsState
> {
  private socket: SocketIOClient.Socket | null
  constructor(props: OutletGroupsProps) {
    super(props)
    this.handleOnOffClick = this.handleOnOffClick.bind(this)
    // this.setModeState = this.setModeState.bind(this) // (I don't think this is needed ***** check)
    this.socket = null
    const outletData: OutletData = {}
    const userSettings: UserSettings = {}
    groupsSettings.forEach((groupSetting, index) => {
      if (groupSetting.enabled) {
        outletData[groupSetting.group] = {
          mode: false,
          time: groupSetting.defaultTimer,
          isTimerRunning: false, // TODO
        }
        userSettings[groupSetting.group] = {
          expandGroup: false,
          showTimer: true,
        }
      }
    })
    this.state = {
      outletData,
      userSettings,
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
    })
    this.socket.on(OUTLET_SYNC_CHANNEL, (syncData: OutletData) => {
      console.log(`OUTLET_SYNC_CHANNEL ${JSON.stringify(syncData)}`)
      this.syncTimerState(syncData)
    })

    let groups: SyncRequestData = []
    for (const group in this.state.outletData) {
      groups.push(group)
    }
    this.socket.emit(OUTLET_SYNC_CHANNEL, groups)
  }

  private syncTimerState(syncData: OutletData): void {
    const newOutletData: OutletData = this.state.outletData

    // only sync the groups that are currently in the state
    for (const stateGroup in this.state.outletData) {
      // *** optional chaining would be sweet here:
      if (stateGroup in syncData) {
        newOutletData[stateGroup] = syncData[stateGroup]
      }
    }
    this.setState({
      ...this.state,
      outletData: newOutletData,
    })
  }

  private setModeState(switchData: SwitchData): void {
    const mergedOutletGoupsData: OutletData = {}
    for (const group in switchData) {
      if (group in this.state.outletData) {
        mergedOutletGoupsData[group] = {
          ...this.state.outletData[group],
          mode: switchData[group].mode,
        }
      }
    }
    this.setState({
      ...this.state, // for other keys (e.g.: userSettings)
      outletData: {
        ...this.state.outletData,
        ...mergedOutletGoupsData,
      },
    })
  }

  private handleOnOffClick(
    event: React.MouseEvent, //*** LEARN used to be .....seEvent<HTMLButtonElement>,
    group: string,
    mode: Mode
  ) {
    console.log('clicked')
    event.stopPropagation()
    const switchData: SwitchData = {
      [group]: { mode },
    }
    if (this.socket) {
      this.socket.emit(OUTLET_SWITCH_CHANNEL, switchData) // or broadcast?
    }
    this.setModeState(switchData)
    // console.log(`Button clicked: ${group} - ${mode}`)
  }

  private broadcastTimer(timerData: TimerData) {
    // console.log(`broadcast timerData: JSON: ${JSON.stringify(timerData)}`)
    if (this.socket) {
      this.socket.emit(OUTLET_TIMER_CHANNEL, timerData)
    }
  }

  private setTimerState(timerData: TimerData) {
    const mergedOutletGoupsData: OutletData = {}
    for (const group in timerData) {
      if (group in this.state.outletData) {
        mergedOutletGoupsData[group] = {
          ...this.state.outletData[group],
          time: timerData[group].time,
          isTimerRunning: timerData[group].isTimerRunning,
        }
      }
    }
    this.setState({
      ...this.state, // for other keys (e.g.: userSettings)
      outletData: {
        ...this.state.outletData,
        ...mergedOutletGoupsData,
      },
    })
    // console.log(`setTimerState END JSON state: ${JSON.stringify(this.state)}`)
  }
  private changeTimer(group: string, milliseconds: number) {
    let newTime = this.state.outletData[group].time + milliseconds
    const isTimerRunning = this.state.outletData[group].isTimerRunning
    const showTimer = this.state.userSettings[group].showTimer
    const increment = timerAdjustments.plus

    if (!isTimerRunning && newTime < 0) {
      newTime = 0
    }
    // BEFORE ROUNDING
    // running AND showTimer => SUBTRACT Date.now()
    // running AND !showTimer => nothing
    // !running AND showTimer => nothing
    // ! running AND !showTimer => ADD Date.now()

    if (isTimerRunning && showTimer) {
      newTime -= Date.now()
    } else if (!isTimerRunning && !showTimer) {
      newTime += Date.now()
    }
    if (milliseconds > 0) {
      newTime = Math.floor(newTime / increment) * increment
    } else {
      newTime = Math.ceil((newTime - 999) / increment) * increment
    }
    if (isTimerRunning && showTimer) {
      newTime += Date.now()
    } else if (!isTimerRunning && !showTimer) {
      newTime -= Date.now()
    }
    if (showTimer) {
      // Time for user to mentally process what just happened
      newTime += 999
    }

    const timerData: TimerData = {
      [group]: {
        time: newTime,
        isTimerRunning,
      },
    }
    this.broadcastTimer(timerData)
    this.setTimerState(timerData)
  }

  // TODO: MOVE DOWN to just above render
  private toggleTimerDisplay(group: string) {
    const currentShowTimer: boolean = this.state.userSettings[group].showTimer
    this.setState({
      ...this.state, // **** TODO test if this is needed or not. clean other code up as well!
      userSettings: {
        ...this.state.userSettings,
        [group]: {
          ...this.state.userSettings[group],
          showTimer: !currentShowTimer,
        },
      },
    })
  }
  private toggleStartPauseTimer(group: string) {
    const outletData: OutletDataValues = this.state.outletData[group]
    let timerData: TimerData
    if (!outletData.isTimerRunning) {
      timerData = {
        [group]: {
          time: Date.now() + outletData.time,
          isTimerRunning: true,
        },
      }
    } else {
      timerData = {
        [group]: {
          time: outletData.time - Date.now(), // time left
          isTimerRunning: false,
        },
      }
    }
    this.broadcastTimer(timerData)
    this.setTimerState(timerData)
  }

  private cancelTimer(group: string) {
    let defaultTimer: number = 0
    const values = getGroupSettingValues(group)
    if (values) {
      defaultTimer = values.defaultTimer
    }
    const timerData: TimerData = {
      [group]: {
        time: defaultTimer,
        isTimerRunning: false,
      },
    }
    this.broadcastTimer(timerData)
    this.setTimerState(timerData)
  }

  private handleExpandGroup(group: string) {
    console.log('expanding')
    const currentExpandGroup: boolean = this.state.userSettings[group]
      .expandGroup
    this.setState({
      ...this.state, // **** TODO test if this is needed or not. clean other code up as well!
      userSettings: {
        ...this.state.userSettings,
        [group]: {
          ...this.state.userSettings[group],
          expandGroup: !currentExpandGroup,
        },
      },
    })
  }

  private handleTimerClick(group: string, action: TimerButtonAction) {
    switch (action) {
      case MINUSMINUS:
        this.changeTimer(group, timerAdjustments.minusminus)
        break
      case MINUS:
        this.changeTimer(group, timerAdjustments.minus)
        break
      case PLUS:
        this.changeTimer(group, timerAdjustments.plus)
        break
      case PLUSPLUS:
        this.changeTimer(group, timerAdjustments.plusplus)
        break
      case STARTPAUSE:
        this.toggleStartPauseTimer(group)
        break
      case CANCEL:
        this.cancelTimer(group)
        break
      case TOGGLEDISPLAY:
        this.toggleTimerDisplay(group)
        break

      default:
        break
    }
  }

  render() {
    const groups = groupsSettings
      .filter(groupSetting => groupSetting.enabled)
      .map((groupSetting: GroupSetting): any => {
        const outletData: OutletDataValues = this.state.outletData[
          groupSetting.group
        ]
        return (
          <Group
            key={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={outletData.mode}
            defaultTimer={outletData.time}
            handleOnOffClick={(event: React.MouseEvent, mode: Mode) =>
              this.handleOnOffClick(event, groupSetting.group, mode)
            }
            time={outletData.time}
            expandGroup={
              this.state.userSettings[groupSetting.group].expandGroup
            }
            handleExpandGroup={() => this.handleExpandGroup(groupSetting.group)}
            isTimerRunning={outletData.isTimerRunning}
            showTimer={this.state.userSettings[groupSetting.group].showTimer}
            handleTimerClick={(action: TimerButtonAction) =>
              this.handleTimerClick(groupSetting.group, action)
            }
          />
        )
      })

    return (
      <div className="wrapper">
        <ul className="accordion-list">{groups}</ul>
      </div>
    )
  }
}

export default OutletGroups
