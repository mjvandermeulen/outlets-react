import React from 'react'
import { OutletGroups } from './components/OutletGroups'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './redux/rootReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

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
