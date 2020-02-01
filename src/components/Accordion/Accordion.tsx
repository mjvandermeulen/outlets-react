import * as React from 'react'
interface AccordionProps {}

export const Accordion: React.FunctionComponent<AccordionProps> = props => {
  return <ul className="Accordion">{props.children}</ul>
}
