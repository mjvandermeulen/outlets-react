import * as React from 'react'
import classNames from 'classnames'
import './AccordionItemInner.css'

interface OwnProps {
  bounce?: boolean
  flip?: boolean // TODO **** implement
  rotate?: boolean // TODO is now the default, but change default to "normal" expand  ****
}

export const AccordionItemInner: React.FunctionComponent<OwnProps> = props => {
  // TODO **** implement flip (rotateX, perspective 500px)
  const { children, bounce } = props
  return (
    <div
      className={classNames('AccordionItemInner', {
        bounce,
      })}
    >
      <div className="AccordionItemInner__content">{children}</div>
    </div>
  )
}
