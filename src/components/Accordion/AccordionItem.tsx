import * as React from 'react'
import classNames from 'classnames'

interface AccordionItemProps {
  closed: boolean
}

export const AccordionItem: React.FunctionComponent<AccordionItemProps> = props => {
  const { children } = props
  return (
    <li className="Accordion__list-item">
      <div
        className={classNames('AccordionItem', {
          'AccordionItem--closed': props.closed,
        })}
      >
        {children}
      </div>
    </li>
  )
}
