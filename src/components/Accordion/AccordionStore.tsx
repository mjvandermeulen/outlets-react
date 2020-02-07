import * as React from 'react'
// Just an HOC, no CSS!

type Expanded = (key: string) => boolean
interface ExpandedKeys {
  [key: string]: boolean
}
type ExpandedAll = () => boolean
type ToggleExpand = (key: string) => void
type ToggleExpandAll = () => void

export interface AccordionContextValue {
  expanded: Expanded
  toggleExpand: ToggleExpand
  expandedAll: ExpandedAll
  toggleExpandAll: () => void
}

const defaultValue: AccordionContextValue = {
  expanded: (_: string) => false,
  toggleExpand: (_: string) => {},
  expandedAll: () => false,
  toggleExpandAll: () => {},
}

export const AccordionContext = React.createContext(defaultValue)
interface State {
  expandedKeys: {
    [key: string]: boolean
  }
}

interface Props {
  keys: string[]
}

const keysSetToSameBoolean = (keys: string[], mode: boolean): ExpandedKeys => {
  return keys.reduce<{}>((acc, cur) => {
    return {
      ...acc,
      [cur]: mode,
    }
  }, {})
}

export class AccordionStore extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // this.props.keys e.g.: ['light','fan']
    // expandedKeys would then be: { light: false, fan: false }
    const expandedKeys = keysSetToSameBoolean(props.keys, false)
    this.state = {
      expandedKeys,

      // LEFT OFF *******
    }
  }

  private expanded: Expanded = (key: string) => {
    return this.state.expandedKeys[key]
  }

  private toggleExpand: ToggleExpand = (key: string) => {
    console.log(
      `Expanding accordion. Parameter (key): ${key} **** TODO Implement`
    )
    this.setState(state => ({
      expandedKeys: {
        ...state.expandedKeys,
        [key]: !state.expandedKeys[key],
      },
    }))
  }

  private expandedAll: ExpandedAll = () => {
    let allExpanded = true
    for (const key in this.state.expandedKeys) {
      allExpanded = allExpanded && this.state.expandedKeys[key]
    }
    return allExpanded
  }

  private toggleExpandAll: ToggleExpandAll = () => {
    console.log(
      'Expanding All accordion. ***** TODO implement depending on all key values. THE ACCORDION NEEDS TO BE GIVEN AN ARRAY OF KEYS! *******'
    )
    const makeAllExpand = !this.expandedAll()
    this.setState(state => ({
      expandedKeys: keysSetToSameBoolean(this.props.keys, makeAllExpand),
    }))
  }

  public render() {
    const { expanded, expandedAll, toggleExpand, toggleExpandAll } = this
    return (
      <AccordionContext.Provider
        value={{
          expanded,
          toggleExpand,
          expandedAll,
          toggleExpandAll,
        }}
      >
        {this.props.children}
      </AccordionContext.Provider>
    )
  }
}
