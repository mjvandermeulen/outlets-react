import * as React from 'react'
// Just an HOC, no CSS!

interface AccordionContextValue {
  expandedAll: boolean
  toggleExpandAll: () => void
}

const defaultValue: AccordionContextValue = {
  expandedAll: false,
  toggleExpandAll: () => {},
}
export const AccordionContext = React.createContext(defaultValue)

type Expanded = (key: string) => boolean
type ToggleExpand = (key: string) => void
type ToggleExpandAll = () => void

interface State {
  expandAll: boolean
}

interface Props {}

export class AccordionStore extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      expandAll: false,
    }
  }

  private expanded: Expanded = (key: string) => {
    // TODO *****
    return key === 'coffee'
  }

  private toggleExpand: ToggleExpand = (key: string) => {
    console.log(
      `Expanding accordion. Parameter (key): ${key} **** TODO Implement`
    )
  }
  private toggleExpandAll: ToggleExpandAll = () => {
    console.log(
      'Expanding All accordion. **** TODO Implement quite a bit more and check'
    )
    console.log(JSON.stringify(this.state.expandAll))
    this.setState(state => ({
      // use function in setState will for sure use the most current state.
      // LEARN. loose interpreation of https://medium.com/@wisecobbler/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1
      // equiv to: function(prevState, props){return({expandAll: etc.})}
      expandAll: !state.expandAll,
    }))
  }

  public render() {
    return (
      <AccordionContext.Provider
        value={{
          expandedAll: this.state.expandAll,
          toggleExpandAll: this.toggleExpandAll,
        }}
      >
        {this.props.children}
      </AccordionContext.Provider>
    )
  }
}
