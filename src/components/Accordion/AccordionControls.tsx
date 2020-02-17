import * as React from 'react'
import { AccordionContext, AccordionContextValue } from './AccordionStore'

// Just an HOC, no CSS!

type Children = (
  accordionControls: AccordionContextValue
) => React.ReactElement | any[] // in case an array is given

interface Props {
  children: Children
}

// LEARN ***** Refresh my own memory how to read this. Learning sake
export const AccordionControls: React.FunctionComponent<Props> = props => {
  return (
    <AccordionContext.Consumer>
      {({
        expanded,
        toggleExpand,
        expandedAll,
        toggleExpandAll,
        lastToggledKey,
      }) =>
        props.children({
          expanded,
          expandedAll,
          toggleExpand,
          toggleExpandAll,
          lastToggledKey,
        })
      }
    </AccordionContext.Consumer>
  )
}
