import * as React from 'react'

import io from 'socket.io-client'

import { Group } from './Group'
import { groupsSettings, GroupSetting, Mode } from '../settings/group-settings'
import { TimerButtonTask } from '../settings/timer-settings'

import '../css/accordion.css' // TODO **** Move to Sass @use rule
import { RootState } from '../redux/rootReducer'
import {
  switchRequestAction,
  socketListenAction,
  requestSyncAction,
  timerAdjustRequestAction,
} from '../redux/outlets/actions'
import { OutletDataValues } from '../redux/outlets/types'
import { connect } from 'react-redux'
import { storeSocketAction } from '../redux/sockets/actions'

// TODO *** move

interface OwnProps {}

type StateProps = ReturnType<typeof mapState>

type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState, ownProps: OwnProps) => ({
  outletData: state.outletData,
  userSettings: state.userSettings,
})

const mapDispatch = {
  storeSocket: storeSocketAction,
  socketListen: socketListenAction,
  requestSync: requestSyncAction,
  switch: switchRequestAction,
  timerAdjustRequest: timerAdjustRequestAction,
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
    const socket = io('http://localhost:3000') // TODO stop hardcoding. ****
    this.props.storeSocket(socket)
    this.props.socketListen()
    this.props.requestSync()

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

  private handleOnOffClick(
    event: React.MouseEvent, //*** LEARN used to be .....seEvent<HTMLButtonElement>,
    group: string,
    mode: Mode
  ) {
    event.stopPropagation() // Try commenting out and it will expand the group
    this.props.switch(group, mode)
  }
  render() {
    const groups = groupsSettings
      .filter(groupSetting => groupSetting.enabled)
      .map((groupSetting: GroupSetting): any => {
        const outletData: OutletDataValues = this.props.outletData.groups[
          groupSetting.group
        ]
        return (
          <Group
            key={groupSetting.group}
            group={groupSetting.group}
            displayName={groupSetting.displayName}
            mode={outletData.mode}
            defaultTimer={groupSetting.defaultTimer}
            handleOnOffClick={(event: React.MouseEvent, mode: Mode) =>
              this.handleOnOffClick(event, groupSetting.group, mode)
            }
            time={outletData.time}
            isTimerRunning={outletData.isTimerRunning}
            handleTimerClick={(task: TimerButtonTask) =>
              this.props.timerAdjustRequest(task, groupSetting.group)
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
