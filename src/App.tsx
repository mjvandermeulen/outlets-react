import React from 'react'
import OutletGroups from './components/OutletGroups'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools())

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <OutletGroups />
      </div>
    </Provider>
  )
}

export default App
