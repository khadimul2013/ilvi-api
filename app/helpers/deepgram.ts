import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk'
import type { DeepgramClient, ListenLiveClient } from '@deepgram/sdk'
import env from '#start/env'

type DeepgramSessionCallbacks = {
  onReady?: () => void
  onLiveTranscript?: (transcript: string) => void
  onFinalTranscript?: (transcript: string) => void
  onError?: (error: unknown) => void
}

class DeepgramSession {
  private audioQueue: ArrayBuffer[] = []
  private finalTranscripts: string[] = []
  private isReady = false

  constructor(
    private connection: ListenLiveClient,
    private callbacks: DeepgramSessionCallbacks = {}
  ) {
    this.registerEvents()
  }

  public sendAudio(chunk: ArrayBuffer) {
    if (!this.isReady) {
      this.audioQueue.push(chunk)
      return
    }

    this.connection.send(chunk)
  }

  public getFinalTranscript() {
    return this.finalTranscripts.join(' ')
  }

  public finish() {
    this.connection.finish()
  }

  private registerEvents() {
    this.connection.on(LiveTranscriptionEvents.Open, () => {
      this.isReady = true
      this.flushAudioQueue()
      this.callbacks.onReady?.()
    })

    this.connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      const transcript = data.channel?.alternatives?.[0]?.transcript

      if (!transcript) return

      if (!data.is_final) {
        this.callbacks.onLiveTranscript?.(transcript)
        return
      }

      this.finalTranscripts.push(transcript)
      this.callbacks.onFinalTranscript?.(transcript)
    })

    this.connection.on(LiveTranscriptionEvents.Error, (error: unknown) => {
      this.callbacks.onError?.(error)
    })
  }

  private flushAudioQueue() {
    this.audioQueue.forEach((chunk) => this.connection.send(chunk))
    this.audioQueue = []
  }
}

class DeepgramService {
  private client: DeepgramClient

  constructor() {
    this.client = createClient(env.get('DEEPGRAM_API_KEY'))
  }

  public createSession(callbacks: DeepgramSessionCallbacks = {}) {
    return new DeepgramSession(this.createConnection(), callbacks)
  }

  private createConnection() {
    return this.client.listen.live({
      model: 'nova-2',
      encoding: 'linear16',
      sample_rate: 16000,
      channels: 1,
      interim_results: true,
      smart_format: true,
      punctuate: true,
    })
  }
}

export type { DeepgramSessionCallbacks }
export { DeepgramService, DeepgramSession }
export default new DeepgramService()
