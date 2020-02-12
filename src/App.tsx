import React from 'react'
import { OutletGroups } from './components/OutletGroups'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './redux/rootReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AccordionStore } from './components/Accordion/AccordionStore'
import { enabledGroupKeys } from './settings/group-settings'
import io from 'socket.io-client'
import { serverURL } from './settings/server-settings'
import socketMiddleware from './redux/middleware/socketMiddleware'

// TODO cleanup **** move to middleware only leave URL here
export const socket: SocketIOClient.Socket = io(serverURL)
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(socket)))
)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AccordionStore keys={enabledGroupKeys}>
        <div className="App">
          <OutletGroups />
        </div>
      </AccordionStore>
    </Provider>
  )
}

export default App
