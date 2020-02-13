import * as React from 'react'
import classNames from 'classnames'
import './AccordionItem.css'

export type expandMode = 'bounce' | 'rotate' | 'default' | 'flip' | 'grow'

interface OwnProps {
  closed: boolean
  // expandMode: expandMode TODO ***** instead of individual booleans
  bounce: boolean
  flip?: boolean // TODO **** implement
  rotate?: boolean // TODO is now the default, but change default to "normal" expand  ****
}

export const AccordionItem: React.FunctionComponent<OwnProps> = props => {
  const { children, closed, bounce, flip } = props
  return (
    <li
      className={classNames('AccordionItem', {
        'AccordionItem--closed': closed,
        bounce, // READ: 'bounce': bounce
        flip,
      })}
    >
      <div className="AccordionItemContent">{children}</div>
    </li>
  )
}
