import * as React from 'react'
import classNames from 'classnames'
import './AccordionItem.css'

interface AccordionItemProps {
  closed: boolean
}

export const AccordionItem: React.FunctionComponent<AccordionItemProps> = props => {
  const { children, closed } = props
  return (
    <li
      className={classNames('AccordionItem', {
        'AccordionItem--closed': closed,
      })}
    >
      <div className="AccordionItemContent">{children}</div>
    </li>
  )
}
