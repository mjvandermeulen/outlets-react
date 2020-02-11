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
// TODO ***** move the socket back in here. only pass the URL
const socketMiddleware = (socket: SocketIOClient.Socket) => {
  //   const socket = io(serverURL)

  interface PayloadWithData {
    data: {}
  }

  return (store: MiddlewareAPI) => (next: any) => <A extends SocketAction>( // MiddlewareAPI is because of error, after using Store. kinda guess work... ***
    action: A
  ) => {
    const { dispatch } = store
    if (typeof action === 'function') {
      return next(action) // This should never happen if thunk is applied first. ***
    }

    const { type, socketChannel, payload, ...rest } = action
    if (!socketChannel) {
      return next(action)
    }
    if (!payload) {
      // Listen
      return socket.on(socketChannel, (data: any) => {
        dispatch({
          type,
          payload: { data },
          ...rest,
        })
      }) // NOTE: do not change to action creator since we're just re-shaping the current one
    }
    // Emit
    return (() => {
      dispatch({
        payload,
        type,
        ...rest,
      })
      socket.emit(socketChannel, (payload as PayloadWithData).data) // LEARN ****
    })() // LEARN ****:
    // compare this to return next(action)
    // NOTE that you return a "called" function
    // Alternative (Abramov) way to call: ****
    // return function emit() {
    //   dispatch({
    //     payload,
    //     type,
    //     ...rest,
    //   })
    //   socket.emit(socketChannel, (payload as PayloadWithData).data) // LEARN ****
    // }
    // NOTE: ***** making the function anonymous does not work:
    //   return function () {...}
    // will not work
  }
}

export default socketMiddleware
