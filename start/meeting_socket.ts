import { Server, Socket } from 'socket.io'
import { createDeepgramConnection } from '#services/deepgram_service'
import AIService from '#services/ai_service'
import Transcription from '#models/transcription'
import { LiveTranscriptionEvents } from '@deepgram/sdk'
import Recording from '#models/recording'
import { TranscriptionStatus } from '../app/Helpers/ENUM.ts'

export const meetingSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    let dgConnection: any = null
    let meetingId: string
    let recordingId: string
    let isDGReady = false

    let audioQueue: Buffer[] = []
    let finalTranscriptBuffer: string[] = []

    // Start transcription
    socket.on('start-transcription', async (data) => {
      try {
        meetingId = data.meetingId
        recordingId = data.recordingId

        socket.join(meetingId)

        dgConnection = createDeepgramConnection()

        dgConnection.on(LiveTranscriptionEvents.Open, () => {
          isDGReady = true

          audioQueue.forEach((buf) => dgConnection.send(buf))
          audioQueue = []

          socket.emit('dg-ready')
        })

        dgConnection.on(LiveTranscriptionEvents.Transcript, (dgData: any) => {
          const transcript =
            dgData.channel?.alternatives?.[0]?.transcript

          if (!transcript) return

          // Live transcript
          if (!dgData.is_final) {
            io.to(meetingId).emit('transcription-live', transcript)
            return
          }

          // Final transcript
          io.to(meetingId).emit('transcription-final', transcript)
          finalTranscriptBuffer.push(transcript)
        })

        dgConnection.on(LiveTranscriptionEvents.Error, (err: any) => {
          console.error(err)
        })

        dgConnection.on(LiveTranscriptionEvents.Close, () => { })
      } catch (err) {
        console.error(err)
      }
    })

    // Audio streaming
    socket.on('audio-data', (chunk: ArrayBuffer) => {
      const buffer = Buffer.from(chunk)

      if (dgConnection && isDGReady) {
        dgConnection.send(buffer)
      } else {
        audioQueue.push(buffer)
      }
    })

    // Stop transcription
    socket.on('stop-transcription', async () => {
      try {
        const fullTranscript = finalTranscriptBuffer.join(' ')
        console.log('Full transcript:', fullTranscript);

        if (!fullTranscript) {
          dgConnection?.finish()
          return
        }

        const aiResult = await AIService.processTranscript(fullTranscript)
        console.log(aiResult, 'AI result from processing transcript');

        const recording = await Recording.findBy('uuid', recordingId)

        if (!recording) {
          console.error('Recording not found')
          return
        }

        await Transcription.create({
          tenantId: recording.tenantId,
          meetingId,
          recordingId: recording.uuid,
          text: fullTranscript,

          aiSummary: aiResult.summary,

          // ✅ FORCE proper JSON format
          aiActions: aiResult.actions || [],
          aiKeyPoints: aiResult.key_points || [],

          status: TranscriptionStatus.COMPLETED,
          language: 'en',
          provider: 'gemini',
        })

        io.to(meetingId).emit('ai-result', {
          ...aiResult,
          transcript: fullTranscript,
        })

        dgConnection?.finish()
      } catch (err) {
        console.error(err)
      }
    })

    // Disconnect
    socket.on('disconnect', async () => {
      dgConnection?.finish()
    })
  })
}