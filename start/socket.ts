import type { Server, Socket } from 'socket.io'
import app from '@adonisjs/core/services/app'
import AIService from '#services/ai_service'
import deepgramService from '#services/deepgram'
import Summary from '#models/summary'
import Transcription from '#models/transcription'
import Upload from '#models/upload'
import User from '#models/user'
import { MEETING_STATUS, TRANSCRIPTION_STATUS } from '#helpers/enum'
import type { DeepgramSession } from '#services/deepgram'

type MeetingSession = {
  meetingId: string
  uploadId: string
  deepgram: DeepgramSession
}

const persistTranscriptResult = async (meetingId: string, uploadId: string, transcript: string) => {
  const aiResult = await AIService.processTranscript(transcript)
  const upload = await Upload.findBy('uuid', uploadId)

  if (!upload) {
    throw new Error('Upload not found')
  }

  const uploader = await User.find(upload.uploadedBy)

  if (!uploader) {
    throw new Error('Upload owner not found')
  }

  await Transcription.create({
    tenantId: uploader.tenantId,
    meetingId,
    uploadId: upload.uuid,
    text: transcript,
    status: TRANSCRIPTION_STATUS.COMPLETED,
    language: 'en',
    provider: 'deepgram',
  })

  await Summary.updateOrCreate(
    { meetingId },
    {
      tenantId: uploader.tenantId,
      meetingId,
      summary: aiResult.summary,
      actions: aiResult.actions || [],
      keyPoints: aiResult.key_points || [],
      provider: 'gemini',
      status: TRANSCRIPTION_STATUS.COMPLETED,
    }
  )

  return aiResult
}

const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const sessions = new Map<string, MeetingSession>()

    socket.on('start-transcription', async ({ meetingId, uploadId }) => {
      try {
        if (!meetingId || !uploadId) {
          socket.emit('transcription-error', {
            message: 'meetingId and uploadId are required',
          })
          return
        }

        sessions.get(meetingId)?.deepgram.finish()
        socket.join(meetingId)

        const deepgram = deepgramService.createSession({
          onReady: () => {
            socket.emit('dg-ready', { meetingId })
          },
          onLiveTranscript: (transcript) => {
            io.to(meetingId).emit('transcription-live', { meetingId, transcript })
          },
          onFinalTranscript: (transcript) => {
            io.to(meetingId).emit('transcription-final', { meetingId, transcript })
          },
          onError: (error) => {
            console.error(error)
            socket.emit('transcription-error', {
              meetingId,
              message: 'Deepgram transcription failed',
            })
          },
        })

        sessions.set(meetingId, {
          meetingId,
          uploadId,
          deepgram,
        })

        io.to(meetingId).emit('transcription-started', {
          meetingId,
          uploadId,
          status: MEETING_STATUS.RECORDING,
        })
      } catch (error) {
        console.error(error)
        socket.emit('transcription-error', {
          meetingId,
          message: 'Unable to start transcription',
        })
      }
    })

    socket.on('audio-data', ({ meetingId, chunk }) => {
      const session = sessions.get(meetingId)

      if (!session) {
        socket.emit('transcription-error', {
          meetingId,
          message: 'No active transcription session for meeting',
        })
        return
      }

      session.deepgram.sendAudio(chunk)
    })

    socket.on('stop-transcription', async ({ meetingId }) => {
      const session = sessions.get(meetingId)

      if (!session) {
        socket.emit('transcription-error', {
          meetingId,
          message: 'No active transcription session for meeting',
        })
        return
      }

      try {
        const transcript = session.deepgram.getFinalTranscript()

        session.deepgram.finish()
        sessions.delete(meetingId)

        if (!transcript) {
          io.to(meetingId).emit('transcription-stopped', {
            meetingId,
            transcript: '',
          })
          return
        }

        const aiResult = await persistTranscriptResult(
          session.meetingId,
          session.uploadId,
          transcript
        )

        io.to(meetingId).emit('ai-result', {
          meetingId,
          uploadId: session.uploadId,
          ...aiResult,
          transcript,
        })
      } catch (error) {
        console.error(error)
        socket.emit('transcription-error', {
          meetingId,
          message: 'Unable to process transcription',
        })
      }
    })

    socket.on('disconnect', async () => {
      sessions.forEach((session) => {
        session.deepgram.finish()
      })
      sessions.clear()
    })
  })
}

app.ready(async () => {
  const { default: ws } = await import('#helpers/ws')

  ws.boot()
  registerSocketHandlers(ws.io)
})
