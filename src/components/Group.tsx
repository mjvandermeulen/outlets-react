// TODO **** This file is obsolete, but here to show what props are needed for
//   the timer func component

import * as React from 'react'
import { connect } from 'react-redux'
// settings
import { Mode } from '../settings/group-settings'
import {
  TimerButtonTask,
  MINUSMINUS,
  PLUSPLUS,
  PLUS,
  MINUS,
  STARTPAUSE,
  CANCEL,
} from '../settings/timer-settings'
// components
import { TimerDisplay } from './TimerDisplay'
import { RemoteControlButton } from './RemoteControlButton'
// types, action and reducers
import {
  toggleExpandAction,
  toggleShowTimerAction,
} from '../redux/userSettings/actions'
import { RootState } from '../redux/rootReducer'
// css
import './Group.css'
import classNames from 'classnames'
import { AccordionItem } from './Accordion/AccordionItem'

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

interface OwnProps {
  group: string
  codes: string[] | undefined
  displayName: string
  mode: boolean
  defaultTimer: number // in milliseconds
  handleOnOffClick: (event: React.MouseEvent, mode: Mode) => void
  time: number
  isTimerRunning: boolean
  handleTimerClick: (action: TimerButtonTask) => void
}

type Props = StateProps & DispatchProps & OwnProps

// LEARN: Use OwnProps to dig in and only use current Groups state
const mapState = (state: RootState, ownProps: OwnProps) => ({
  expandGroup: state.userSettings.groups[ownProps.group].expandGroup,
  showTimer: state.userSettings.groups[ownProps.group].showTimer,
})

const mapDispatch = {
  toggleExpand: toggleExpandAction,
  toggleShowTimer: toggleShowTimerAction,
}

class GroupComponent extends React.Component<Props> {
  render() {
    return <div></div>
  }
}

export const Group = connect(mapState, mapDispatch)(GroupComponent)

//   < Group
// key = { groupSetting.group }
// group = { groupSetting.group }
// codes = { groupSetting.codes }
// displayName = { groupSetting.displayName }
// mode = { outletData.mode }
// defaultTimer = { groupSetting.defaultTimer }
// handleOnOffClick = {(
//   event: React.MouseEvent,
//   mode: Mode
// ) =>
// this.handleOnOffClick(event, groupSetting.group, mode)
//                         }
// time = { outletData.time }
// isTimerRunning = { outletData.isTimerRunning }
// handleTimerClick = {(task: TimerButtonTask) =>
// this.props.timerAdjustRequest(
//   task,
//   groupSetting.group
// )
//                         }
// />
