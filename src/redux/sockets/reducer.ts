const initialState = {
  socket: null,
}

// TODO: search "any" **
export const socketsReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    // TODO move to const
    case 'STORE_SOCKET':
      return {
        ...state,
        socket: action.payload.socket,
      }
    default:
      return state
  }
}
