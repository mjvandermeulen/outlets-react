import * as React from 'react'
import classNames from 'classnames'
import './AccordionItem.css'

export type expandMode = 'bounce' | 'rotate' | 'default' | 'flip' | 'grow'

interface OwnProps {
  itemKey: string
  closed: boolean
  lastToggledKey: string
  // expandMode: expandMode TODO ***** instead of individual booleans
  // **** make a expandMode 'default', 'rotate', bounce and flip and reverse-flip
  bounce: boolean
  flip?: boolean
  rotate?: boolean // TODO is now the default, but change default to "normal" expand  ****
}

export const AccordionItem: React.FunctionComponent<OwnProps> = props => {
  const { children, itemKey, closed, bounce, flip, lastToggledKey } = props
  return (
    <li
      className={classNames('AccordionItem', {
        'AccordionItem--closed': closed,
        // bounce, // READ: 'bounce' : bounce, ( OLD line left here to LEARN *** )
        bounce: bounce && lastToggledKey === itemKey,
        flip: flip && lastToggledKey === itemKey,
      })}
    >
      <div className="AccordionItemContent">{children}</div>
    </li>
  )
}
