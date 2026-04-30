import { createClient } from '@deepgram/sdk'
import env from '#start/env'

const deepgram = createClient(env.get('DEEPGRAM_API_KEY'))

export const createDeepgramConnection = () => {
    return deepgram.listen.live({
        model: 'nova-2',
        encoding: 'linear16',
        sample_rate: 16000,
        channels: 1,
        interim_results: true,
        smart_format: true,
        punctuate: true,
    })
}