import * as React from 'react'

type Expand = (key: string) => void
type ExpandAll = () => void

type Children = (
  expand: Expand,
  expandAll?: ExpandAll
) => React.ReactElement | any[]

interface AccordionProps {
  children: Children
}

// LEARN: I prefer   const { children } = props in the next line, but left here to learn ****
export const Accordion: React.FunctionComponent<AccordionProps> = ({
  children,
}) => {
  const expand: Expand = (key: string) => {
    console.log(
      `Expanding accordion. Parameter (key): ${key} ***** TODO Implement`
    )
  }
  const expandAll: ExpandAll = () => {
    console.log('Expanding All accordion. ***** TODO Implement ')
  }
  // const children = props.children as Children // Dangerously assume children is not a string *******
  return <ul className="Accordion">{children(expand, expandAll)}</ul>
}
