import * as React from 'react'
import './Accordion.css' // TODO **** Move to Sass @use rule

interface OwnProps {}

// LEARN: I prefer   const { children } = props in the next line, but left here to learn ****
export const Accordion: React.FunctionComponent<OwnProps> = ({ children }) => {
  return <ul className="Accordion">{children}</ul>
}
