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
  // lastToggleWasAll: boolean no longer needed: lastToggledKey empty says it all
  lastToggledKey: string
  // TODO ***** turn into lastToggledKeys: string[]
}

const defaultValue: AccordionContextValue = {
  expanded: (_: string) => false,
  toggleExpand: (_: string) => {},
  expandedAll: () => false,
  toggleExpandAll: () => {},
  lastToggledKey: '',
}

export const AccordionContext = React.createContext(defaultValue)
interface State {
  expandedKeys: {
    [key: string]: boolean
  }
  lastToggledKey: string
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
      lastToggledKey: '',
    }
  }

  private expanded: Expanded = (key: string) => {
    return this.state.expandedKeys[key]
  }

  private toggleExpand: ToggleExpand = (key: string) => {
    this.setState(state => ({
      lastToggledKey: key,
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
    const makeAllExpand = !this.expandedAll()
    this.setState(state => ({
      lastToggledKey: '',
      expandedKeys: keysSetToSameBoolean(this.props.keys, makeAllExpand),
    }))
  }

  public render() {
    const { expanded, expandedAll, toggleExpand, toggleExpandAll } = this
    const { lastToggledKey } = this.state
    return (
      <AccordionContext.Provider
        value={{
          expanded,
          toggleExpand,
          expandedAll,
          toggleExpandAll,
          lastToggledKey,
        }}
      >
        {this.props.children}
      </AccordionContext.Provider>
    )
  }
}
