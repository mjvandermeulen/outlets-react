import * as React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
// Components
import { Accordion } from './Accordion/Accordion'
import { AccordionItem } from './Accordion/AccordionItem'
import { AccordionItemLine } from './Accordion/AccordionItemLine'
import { AccordionItemInner } from './Accordion/AccordionItemInner'
import { RemoteControlButton } from './RemoteControlButton'
import { TimerDisplay } from './TimerDisplay'
// Settings
import { groupsSettings, GroupSetting, Mode } from '../settings/group-settings'
import {
  MINUSMINUS,
  PLUSPLUS,
  PLUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
} from '../settings/timer-settings'
import { serverURL } from '../settings/server-settings'
// types and actions
import { UserSetting } from '../redux/userSettings/types'
import { OutletDataValues } from '../redux/outlets/types'
import {
  toggleExpandAction,
  toggleShowTimerAction,
} from '../redux/userSettings/actions'
import {
  switchRequestAction,
  socketListenAction,
  requestSyncAction,
  timerAdjustRequestAction,
} from '../redux/outlets/actions'
import { storeSocketAction } from '../redux/sockets/actions'
import { RootState } from '../redux/rootReducer'
// css
import './OutletGroups.css'
import { AccordionStore } from './Accordion/AccordionStore'
import { AccordionControls } from './Accordion/AccordionControls'
import classNames from 'classnames'

interface OwnProps {}

type StateProps = ReturnType<typeof mapState>

type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState /* , ownProps: OwnProps */) => ({
  // LEARN ***: I used to use ownProps here, to narrow down to the group, when this
  //   was still part of <Group>
  outletData: state.outletData,
  userSettings: state.userSettings,
})

const mapDispatch = {
  storeSocket: storeSocketAction,
  socketListen: socketListenAction,
  requestSync: requestSyncAction,
  switch: switchRequestAction,
  timerAdjustRequest: timerAdjustRequestAction,
  toggleExpand: toggleExpandAction,
  toggleShowTimer: toggleShowTimerAction,
}

class OutletGroupsComponent extends React.Component<Props> {
  // TODO cleanup *** unused  var socket
  private socket: SocketIOClient.Socket | null
  constructor(props: Props) {
    super(props)
    this.socket = null
  }

  public componentDidMount() {
    // // TODO: Move socket/io('htt..... out of component: always have this connection?
    // then pass it into the props...?  ****
    // Or better: Move to redux middleware???? ****
    const socket = io(serverURL)
    this.props.storeSocket(socket)
    this.props.socketListen()
    this.props.requestSync()
  }

  private handleOnOffClick(
    event: React.MouseEvent, //*** LEARN used to be .....seEvent<HTMLButtonElement>,
    group: string,
    mode: Mode
  ) {
    event.stopPropagation() // To prevent expanding the group.
    this.props.switch(group, mode)
  }
  public render() {
    return (
      <AccordionControls>
        {accordionControls => (
          <div className="wrapper">
            <div className="group-line">
              <div className="group-button">
                <RemoteControlButton
                  className={classNames('button-toggle-expand-all', {
                    'button-toggle-expand-all--expanded':
                      accordionControls.expandedAll,
                  })}
                  active={accordionControls.expandedAll} // TODO animate instead using css TODO *****
                  handleClick={() => accordionControls.toggleExpandAll()} // TODO and LEARN: change so you force the need of a" bind this"
                >
                  <div className="expand-all-text">all</div>
                  <div className="caret-parent">
                    <i className="caret" />
                  </div>
                </RemoteControlButton>
              </div>
            </div>
            <Accordion>
              {groupsSettings
                .filter(groupSetting => groupSetting.enabled)
                .map((groupSetting: GroupSetting): any => {
                  const group = groupSetting.group
                  const outletData: OutletDataValues = this.props.outletData
                    .groups[group]
                  const userSetting: UserSetting = this.props.userSettings
                    .groups[group]
                  return (
                    <AccordionItem
                      key={group}
                      closed={
                        !userSetting.expandGroup &&
                        !accordionControls.expandedAll
                      }
                    >
                      <AccordionItemLine
                        onClick={() => {
                          this.props.toggleExpand(group)
                        }}
                      >
                        <div className="AccordionItemLine__title">
                          {groupSetting.displayName}
                        </div>
                        <RemoteControlButton
                          className="button__toggle-expand"
                          active={false} // animate instead using --closed class
                          handleClick={() => {}}
                        >
                          <i className="caret" />
                        </RemoteControlButton>
                        <div className="AccordionItemLine__on-off-buttons">
                          <RemoteControlButton
                            active={outletData.mode}
                            handleClick={event => {
                              this.handleOnOffClick(
                                event,
                                groupSetting.group,
                                true
                              )
                            }}
                          >
                            On
                          </RemoteControlButton>
                          <RemoteControlButton
                            active={!outletData.mode}
                            handleClick={event => {
                              this.handleOnOffClick(
                                event,
                                groupSetting.group,
                                false
                              )
                            }}
                          >
                            Off
                          </RemoteControlButton>
                        </div>
                      </AccordionItemLine>
                      <AccordionItemInner bounce={group === 'coffee'}>
                        {/* TODO **** Move timer div to own component */}
                        <div className="timer">
                          <div className="timer__line timer__display-line">
                            <RemoteControlButton
                              handleClick={event =>
                                this.props.timerAdjustRequest(PLUSPLUS, group)
                              }
                            >
                              ++
                            </RemoteControlButton>
                            <RemoteControlButton
                              handleClick={event =>
                                this.props.timerAdjustRequest(PLUS, group)
                              }
                            >
                              +
                            </RemoteControlButton>
                            <TimerDisplay
                              time={outletData.time}
                              isTimerRunning={outletData.isTimerRunning}
                              showTimer={userSetting.showTimer}
                            />
                            <RemoteControlButton
                              enabled={outletData.time > 0}
                              handleClick={event =>
                                this.props.timerAdjustRequest(MINUSMINUS, group)
                              }
                            >
                              --
                            </RemoteControlButton>
                            <RemoteControlButton
                              enabled={outletData.time > 0}
                              handleClick={event =>
                                this.props.timerAdjustRequest(MINUS, group)
                              }
                            >
                              -
                            </RemoteControlButton>
                          </div>
                          <div className="timer__line">
                            <RemoteControlButton
                              enabled={
                                outletData.isTimerRunning || outletData.time > 0
                              }
                              handleClick={event =>
                                this.props.timerAdjustRequest(STARTPAUSE, group)
                              }
                            >
                              {outletData.isTimerRunning ? 'pause' : 'start'}
                            </RemoteControlButton>
                            <RemoteControlButton
                              enabled={
                                outletData.time !== groupSetting.defaultTimer
                              }
                              handleClick={event =>
                                this.props.timerAdjustRequest(CANCEL, group)
                              }
                            >
                              cancel
                            </RemoteControlButton>
                            <RemoteControlButton
                              handleClick={event =>
                                this.props.toggleShowTimer(group)
                              }
                            >
                              {userSetting.showTimer
                                ? 'show set time'
                                : 'show timer'}
                            </RemoteControlButton>
                          </div>
                        </div>
                      </AccordionItemInner>
                    </AccordionItem>
                  )
                })}
            </Accordion>
          </div>
        )}
      </AccordionControls>
    )
  }
}

export const OutletGroups = connect(
  mapState,
  mapDispatch
)(OutletGroupsComponent)
