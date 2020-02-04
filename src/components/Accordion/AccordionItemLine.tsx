import * as React from 'react'
import './AccordionItemLine.css'

interface OwnProps {
  onClick: (event: React.MouseEvent) => void
}

export const AccordionItemLine: React.FunctionComponent<OwnProps> = props => {
  const { children, onClick } = props
  return (
    <div className="AccordionItemLine" onClick={onClick}>
      <div className="AccordionItemLine__content">{children}</div>
    </div>
  )
}
