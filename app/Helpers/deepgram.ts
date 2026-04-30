import { createClient } from '@deepgram/sdk'
import type { DeepgramClient, ListenLiveClient } from '@deepgram/sdk'
import env from '#start/env'

class DeepGram {
  public client!: DeepgramClient
  public live!: ListenLiveClient
  public booted = false

  public boot() {
    if (this.booted) return
    this.booted = true
    this.client = createClient(env.get('DEEPGRAM_API_KEY'))
    this.live = this.client.listen.live({
      model: 'nova-2',
      encoding: 'linear16',
      sample_rate: 16000,
      channels: 1,
      interim_results: true,
      smart_format: true,
      punctuate: true,
    })
  }

  public getInstance(): DeepgramClient {
    if (!this.booted) {
      throw new Error('Socket not initialized')
    }
    return this.client
  }
}

export default new DeepGram()
