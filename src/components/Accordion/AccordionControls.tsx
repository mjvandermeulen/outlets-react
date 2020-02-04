import * as React from 'react'
import { AccordionContext } from './AccordionStore'

// Just an HOC, no CSS!

type Expanded = (key: string) => boolean
type ToggleExpand = (key: string) => void
type ToggleExpandAll = () => void

interface ChildrenParams {
  // expanded: Expanded
  expandedAll: boolean
  // toggleExpand: ToggleExpand
  toggleExpandAll: ToggleExpandAll
}

type Children = (childrenParams: ChildrenParams) => React.ReactElement | any[] // in case an array is given

interface State {
  expandAll: boolean
}

interface Props {
  children: Children
}

export const AccordionControls: React.FunctionComponent<Props> = props => {
  return (
    <AccordionContext.Consumer>
      {({ expandedAll, toggleExpandAll }) =>
        props.children({
          // expanded,
          expandedAll,
          // toggleExpand,
          toggleExpandAll,
        })
      }
    </AccordionContext.Consumer>
  )
}
