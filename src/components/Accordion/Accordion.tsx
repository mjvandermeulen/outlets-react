import * as React from 'react'
import './Accordion.css' // TODO **** Move to Sass @use rule

type ToggleExpand = (key: string) => void
type ToggleExpandAll = () => void

// LEARN: The func component does not have to be called with arguments for these params! ****
type Children = (
  expand: ToggleExpand,
  expandAll: ToggleExpandAll
) => React.ReactElement | any[]

interface AccordionProps {
  children: Children
}

// LEARN: I prefer   const { children } = props in the next line, but left here to learn ****
export const Accordion: React.FunctionComponent<AccordionProps> = ({
  children,
}) => {
  const toggleExpand: ToggleExpand = (key: string) => {
    console.log(
      `Expanding accordion. Parameter (key): ${key} **** TODO Implement`
    )
  }
  const togglExpandAll: ToggleExpandAll = () => {
    console.log('Expanding All accordion. **** TODO Implement ')
  }
  return <ul className="Accordion">{children(toggleExpand, togglExpandAll)}</ul>
}
