import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'
import { meetingSocket } from '#start/meeting_socket'

class SocketService {
  public io: Server | null = null

  public boot() {
    if (this.io) return
    this.io = new Server(server.getNodeServer(), {
      cors: { origin: '*' },
    })

    meetingSocket(this.io)
    console.log('Socket initialized')
  }

  public getInstance(): Server {
    if (!this.io) {
      throw new Error('Socket not initialized')
    }
    return this.io
  }
}

export default new SocketService()