import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// Components
import { Accordion } from './Accordion/Accordion'
import { AccordionItem } from './Accordion/AccordionItem'
import { AccordionItemLine } from './Accordion/AccordionItemLine'
import { AccordionItemInner } from './Accordion/AccordionItemInner'
import { AccordionControls } from './Accordion/AccordionControls'
import { RemoteControlButton } from './RemoteControlButton'
import { Timer } from './Timer'
// Settings
import {
  Mode,
  enabledGroupSettingsArray,
  GroupSettingWithGroup,
} from '../settings/group-settings'
// redux
import {
  OutletDataValues,
  SyncRequestData,
  TimerDataValues,
} from '../redux/outlets/types'
import {
  sendSyncRequestAction,
  sendTimerDataAction,
  receiveSwitchDataAction,
  receiveTimerDataAction,
  receiveSyncDataAction,
  sendSwitchDataAction,
} from '../redux/outlets/actions'
import { RootState } from '../redux/rootReducer'
// css
import './OutletGroups.css'

interface OwnProps {}

type StateProps = ReturnType<typeof mapState>

type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState /* , ownProps: OwnProps */) => ({
  // LEARN ***: I used to use ownProps here, to narrow down to the group, when this
  //   was still part of <Group>
  outletData: state.outletData,
})

const mapDispatch = {
  receiveSwitchData: receiveSwitchDataAction,
  receiveSyncData: receiveSyncDataAction,
  receiveTimerData: receiveTimerDataAction,
  sendSwitchData: sendSwitchDataAction,
  sendTimerData: sendTimerDataAction,
  sendSyncRequest: sendSyncRequestAction,
}

class OutletGroupsComponent extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.receiveSwitchData()
    this.props.receiveTimerData()
    this.props.receiveSyncData()

    const groups: SyncRequestData = []
    for (const group in this.props.outletData.groups) {
      groups.push(group)
    }
    this.props.sendSyncRequest(groups) // move to middleware??? *** Nay: Too soon: not ready to listen yet
  }

  private handleOnOffClick(
    event: React.MouseEvent, //*** LEARN used to be .....seEvent<HTMLButtonElement>,
    group: string,
    mode: Mode
  ) {
    event.stopPropagation() // To prevent expanding the group.
    this.props.sendSwitchData({
      [group]: { mode },
    })
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
                    'button-toggle-expand-all--expanded': accordionControls.expandedAll(),
                  })}
                  active={false} // animated instead
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
              {enabledGroupSettingsArray.map(
                (groupSetting: GroupSettingWithGroup): React.ReactElement => {
                  const group = groupSetting.group
                  const outletData: OutletDataValues = this.props.outletData
                    .groups[group]
                  return (
                    <AccordionItem
                      key={group}
                      itemKey={group}
                      lastToggledKey={accordionControls.lastToggledKey}
                      closed={!accordionControls.expanded(group)}
                      rotate={group === 'officelight'}
                      bounce={group === 'coffee'}
                      flip={group === 'guestlight'}
                    >
                      <AccordionItemLine
                        onClick={() => {
                          accordionControls.toggleExpand(group)
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
                      <AccordionItemInner>
                        <Timer
                          handleTimerDataValues={(
                            timerDataValues: TimerDataValues
                          ) => {
                            this.props.sendTimerData({
                              [group]: timerDataValues,
                            })
                          }}
                          time={outletData.time}
                          isTimerRunning={outletData.isTimerRunning}
                          defaultTimer={groupSetting.defaultTimer}
                        />
                      </AccordionItemInner>
                    </AccordionItem>
                  )
                }
              )}
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
