import * as React from 'react'
import { AccordionContext, AccordionContextValue } from './AccordionStore'

// Just an HOC, no CSS!

type Children = (
  accordionControls: AccordionContextValue
) => React.ReactElement | any[] // in case an array is given

interface State {
  expandAll: boolean
}

interface Props {
  children: Children
}

export const AccordionControls: React.FunctionComponent<Props> = props => {
  return (
    <AccordionContext.Consumer>
      {({ expanded, toggleExpand, expandedAll, toggleExpandAll }) =>
        props.children({
          expanded,
          expandedAll,
          toggleExpand,
          toggleExpandAll,
        })
      }
    </AccordionContext.Consumer>
  )
}
