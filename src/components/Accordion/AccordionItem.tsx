import * as React from 'react'
import classNames from 'classnames'

interface AccordionItemProps {
  closed: boolean
}

export const AccordionItem: React.FunctionComponent<AccordionItemProps> = props => {
  return (
    <li className="Accordion__list-item">
      <div
        className={classNames('AccordionItem', {
          'AccordionItem--closed': props.closed,
        })}
      >
        {props.children}
      </div>
    </li>
  )
}
