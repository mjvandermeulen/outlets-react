import * as React from 'react'
import classNames from 'classnames'
import './AccordionItemInner.css'

interface OwnProps {}

export const AccordionItemInner: React.FunctionComponent<OwnProps> = props => {
  const { children } = props
  return (
    <div className={classNames('AccordionItemInner', {})}>
      <div className="AccordionItemInner__content">{children}</div>
    </div>
  )
}
