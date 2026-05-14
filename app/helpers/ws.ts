import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

class WS {
  public io!: Server

  public boot() {
    if (this.io) return
    this.io = new Server(server.getNodeServer(), {
      cors: { origin: '*' },
    })
    console.log('Socket initialized')
  }

  public getInstance(): Server {
    if (!this.io) {
      throw new Error('Socket not initialized')
    }
    return this.io
  }
}

export default new WS()
