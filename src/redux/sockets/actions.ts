export const storeSocketAction = (socket: SocketIOClient.Socket) => ({
  type: 'STORE_SOCKET',
  payload: {
    socket,
  },
})
