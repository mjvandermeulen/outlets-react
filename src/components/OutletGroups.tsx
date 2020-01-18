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
import { RootState } from '../redux/rootReducer'
import { switchAction } from '../redux/outlets/actions'
import {
  SwitchData,
  OutletData,
  TimerData,
  OutletDataValues,
  OUTLET_TIMER_CHANNEL,
  OUTLET_SWITCH_CHANNEL,
} from '../redux/outlets/types'
import { connect } from 'react-redux'

// TODO *** move

interface OwnProps {}

type StateProps = ReturnType<typeof mapState>

type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState, ownProps: OwnProps) => ({
  outletData: state.outletData,
})

const mapDispatch = {
  switch: switchAction,
}

class OutletGroupsComponent extends React.Component<Props> {
  private socket: SocketIOClient.Socket | null
  constructor(props: Props) {
    super(props)
    this.socket = null
  }

  public componentDidMount() {
    // // TODO: Move socket/io('htt..... out of component: always have this connection?
    // then pass it into the props...?  ****
    this.socket = io('http://localhost:3000') // TODO stop hardcoding. ****
    this.socket.on(OUTLET_SWITCH_CHANNEL, (switchData: SwitchData) => {
      this.setModeState(switchData)
    })
    // this.socket.on(OUTLET_TIMER_CHANNEL, (timerData: TimerData) => {
    //   this.setTimerState(timerData)
    // })
    // this.socket.on(OUTLET_SYNC_CHANNEL, (syncData: OutletData) => {
    //   this.syncTimerState(syncData)
    // })
    // let groups: SyncRequestData = []
    // for (const group in this.props.outletData) {
    //   groups.push(group)
    // }
    // this.socket.emit(OUTLET_SYNC_CHANNEL, groups)
  }

  private syncTimerState(syncData: OutletData): void {
    // const newOutletData: OutletData = this.state.outletData
    // // only sync the groups that are currently in the state
    // for (const stateGroup in this.state.outletData) {
    //   // *** optional chaining would be sweet here:
    //   if (stateGroup in syncData) {
    //     newOutletData[stateGroup] = syncData[stateGroup]
    //   }
    // }
    // this.setState({
    //   outletData: newOutletData,
    // })
  }

  private setModeState(switchData: SwitchData): void {
    // const mergedOutletGoupsData: OutletData = {}
    // for (const group in switchData) {
    //   if (group in this.state.outletData) {
    //     mergedOutletGoupsData[group] = {
    //       ...this.state.outletData[group],
    //       mode: switchData[group].mode,
    //     }
    //   }
    // }
    // this.setState({
    //   outletData: {
    //     ...this.state.outletData,
    //     ...mergedOutletGoupsData,
    //   },
    // })
  }

  private handleOnOffClick(
    event: React.MouseEvent, //*** LEARN used to be .....seEvent<HTMLButtonElement>,
    group: string,
    mode: Mode
  ) {
    event.stopPropagation() // Try commenting out and it will expand the group
    if (this.socket) {
      this.props.switch(this.socket, group, mode)
    }
  }

  private broadcastTimer(timerData: TimerData) {
    // console.log(`broadcast timerData: JSON: ${JSON.stringify(timerData)}`)
    if (this.socket) {
      this.socket.emit(OUTLET_TIMER_CHANNEL, timerData)
    }
  }

  private setTimerState(timerData: TimerData) {
    // const mergedOutletGoupsData: OutletData = {}
    // for (const group in timerData) {
    //   if (group in this.state.outletData) {
    //     mergedOutletGoupsData[group] = {
    //       ...this.state.outletData[group],
    //       time: timerData[group].time,
    //       isTimerRunning: timerData[group].isTimerRunning,
    //     }
    //   }
    // }
    // this.setState({
    //   outletData: {
    //     ...this.state.outletData,
    //     ...mergedOutletGoupsData,
    //   },
    // })
    // console.log(`setTimerState END JSON state: ${JSON.stringify(this.state)}`)
  }
  private changeTimer(group: string, milliseconds: number) {
    // let newTime = this.state.outletData[group].time + milliseconds
    // const isTimerRunning = this.state.outletData[group].isTimerRunning
    // const showTimer = this.state.userSettings[group].showTimer
    // const increment = timerAdjustments.plus
    // if (!isTimerRunning && newTime < 0) {
    //   newTime = 0
    // }
    // // BEFORE ROUNDING
    // // running AND showTimer => SUBTRACT Date.now()
    // // running AND !showTimer => nothing
    // // !running AND showTimer => nothing
    // // ! running AND !showTimer => ADD Date.now()
    // if (isTimerRunning && showTimer) {
    //   newTime -= Date.now()
    // } else if (!isTimerRunning && !showTimer) {
    //   newTime += Date.now()
    // }
    // if (milliseconds > 0) {
    //   newTime = Math.floor(newTime / increment) * increment
    // } else {
    //   newTime = Math.ceil((newTime - 999) / increment) * increment
    // }
    // if (isTimerRunning && showTimer) {
    //   newTime += Date.now()
    // } else if (!isTimerRunning && !showTimer) {
    //   newTime -= Date.now()
    // }
    // if (showTimer) {
    //   // Time for user to mentally process what just happened
    //   newTime += 999
    // }
    // const timerData: TimerData = {
    //   [group]: {
    //     time: newTime,
    //     isTimerRunning,
    //   },
    // }
    // this.broadcastTimer(timerData)
    // this.setTimerState(timerData)
  }

  // TODO: MOVE DOWN to just above render
  // TODO: **** no longer needed cleanup after changing to redux, but leave here
  // because we may bring it back to OutletGroups
  private toggleTimerDisplay(group: string) {
    // const currentShowTimer: boolean = this.state.userSettings[group].showTimer
    // this.setState({
    //   userSettings: {
    //     ...this.state.userSettings,
    //     [group]: {
    //       ...this.state.userSettings[group],
    //       showTimer: !currentShowTimer,
    //     },
    //   },
    // })
  }
  private toggleStartPauseTimer(group: string) {
    // const outletData: OutletDataValues = this.state.outletData[group]
    // let timerData: TimerData
    // if (!outletData.isTimerRunning) {
    //   timerData = {
    //     [group]: {
    //       time: Date.now() + outletData.time,
    //       isTimerRunning: true,
    //     },
    //   }
    // } else {
    //   timerData = {
    //     [group]: {
    //       time: outletData.time - Date.now(), // time left
    //       isTimerRunning: false,
    //     },
    //   }
    // }
    // this.broadcastTimer(timerData)
    // this.setTimerState(timerData)
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
    // const currentExpandGroup: boolean = this.state.userSettings[group]
    //   .expandGroup
    // this.setState({
    //   userSettings: {
    //     ...this.state.userSettings,
    //     [group]: {
    //       ...this.state.userSettings[group],
    //       expandGroup: !currentExpandGroup,
    //     },
    //   },
    // })
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
        const outletData: OutletDataValues = this.props.outletData[
          groupSetting.group
        ]
        return (
          <Group
            key={groupSetting.group}
            group={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={outletData.mode}
            defaultTimer={outletData.time}
            handleOnOffClick={(event: React.MouseEvent, mode: Mode) =>
              this.handleOnOffClick(event, groupSetting.group, mode)
            }
            time={outletData.time}
            handleExpandGroup={() => this.handleExpandGroup(groupSetting.group)}
            isTimerRunning={outletData.isTimerRunning}
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

export const OutletGroups = connect(
  mapState,
  mapDispatch
)(OutletGroupsComponent)
