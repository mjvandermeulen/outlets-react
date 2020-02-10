import { Action, MiddlewareAPI } from 'redux'

// type SocketMode = 'listen' | 'emit' *** not needed: if you have a payload you emit, if not: listen.

// Copied from: https://nmajor.com/posts/using-socket-io-with-redux-websocket-redux-middleware
interface SocketAction extends Action {
  socketChannel: string // TODO type stronger by referring to the channels?
  //   socketMode: SocketMode
  payload: {}
}

// NOTE: **** returning a function by calling the function may no longer be needed (no longer a closure needed to "remember" the socket)
// BUT needed so far to pass the socket in...
const socketMiddleware = (socket: SocketIOClient.Socket) => {
  //   const socket = io(serverURL)

  return (store: MiddlewareAPI) => (next: any) => <A extends SocketAction>( // MiddlewareAPI is because of error, after using Store. kinda guess work... ***
    action: A
  ) => {
    const { dispatch } = store
    if (typeof action === 'function') {
      console.log('pass it on to next(action) ****')
      // TODO: copied from https://nmajor.com/posts/using-socket-io-with-redux-websocket-redux-middleware
      // I don't agree with his approach, to add a funcion under "handle" key.
      // I prefer to keep the normal Redux approach: An action is either an Object with a type key, or a function.
      // BUT:... How to distinguish between any thunk VS one that needs to be consumed here?
      // NOTE: **** LEARN this needs to be implemented, it has to appear before thunk calling the middleware !!!!!
      return next(action) // for now. TODO maybe allow functions later.
    }

    const { type, socketChannel, payload, ...rest } = action
    console.log('socketMiddleWare!!! YO ****')
    if (!socketChannel) {
      return next(action)
    }
    let resultFunction: any
    if (!payload) {
      // Listen
      console.log('listen without payload ****')
      resultFunction = socket.on(
        socketChannel,
        (
          data: any // change to better data interface ****
        ) => {
          console.log('dispatching.....')
          dispatch({
            type,
            payload: { data },
            ...rest,
          })
        }
      ) // TODO **** change to action creater NO: it's the same action, but stripped from the channel.
    } else {
      // Emit
      // ******* for now: don't do anything, handled elseware like in the days of old
      return next(action)
    }
    return resultFunction
  }
}

export default socketMiddleware
