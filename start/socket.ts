import type { Server, Socket } from 'socket.io'
import app from '@adonisjs/core/services/app'
import AIService from '#services/ai_service'
import deepgramService from '#helpers/deepgram'
import Summary from '#models/summary'
import Transcription from '#models/transcription'
import User from '#models/user'
import { MEETING_STATUS, TRANSCRIPTION_STATUS } from '#helpers/enum'
import type { DeepgramSession } from '#helpers/deepgram'
import Meeting from '#models/meeting'
import { AI } from '#types'

type MeetingSession = {
  meetingId: string
  deepgram: DeepgramSession
}

const persistTranscriptResult = async (
  meetingId: string,
  transcript: string
) => {
  try {
    console.log('Persisting transcript for meeting:', meetingId)

    const meeting = await Meeting.find(meetingId)

    if (!meeting) {
      console.error('Meeting not found:', meetingId)
      return {
        transcription: null,
        ai: {
          summary: '',
          actions: [],
          key_points: [],
        },
      }
    }

    const user = await User.find(meeting.createdBy)

    if (!user) {
      console.error('User not found:', meeting.createdBy)
      return {
        transcription: null,
        ai: {
          summary: '',
          actions: [],
          key_points: [],
        },
      }
    }

    // Save transcription FIRST
    const trans = await Transcription.create({
      tenantId: meeting.tenantId,
      meetingId,
      text: transcript,
      status: TRANSCRIPTION_STATUS.COMPLETED,
      language: 'en',
      provider: 'deepgram',
    })

    console.log('Transcription saved:', trans.uuid)

    // AI processing (safe)
    let aiResult: AI = {
      summary: '',
      actions: [],
      key_points: [],
    }

    try {
      aiResult = await AIService.processTranscript(transcript)
      console.log('AI Result:', aiResult)
    } catch (err) {
      console.error('AI failed:', err)
    }

    //3. Save summary (never fail app)
    try {
      await Summary.updateOrCreate(
        { meetingId },
        {
          tenantId: meeting.tenantId,
          meetingId,
          summary: aiResult.summary,
          actions: aiResult.actions || [],
          keyPoints: aiResult.key_points || [],
          provider: 'gemini',
          status: TRANSCRIPTION_STATUS.COMPLETED,
        }
      )

      console.log('Summary saved')
    } catch (err) {
      console.error('Summary save failed:', err)
    }

    return {
      transcription: trans,
      ai: aiResult,
    }
  } catch (error) {
    console.error('Persist error:', error)

    return {
      transcription: null,
      ai: {
        summary: '',
        actions: [],
        key_points: [],
      },
    }
  }
}

const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const sessions = new Map<string, MeetingSession>()

    socket.on('start-transcription', async ({ meetingId }) => {
      try {
        if (!meetingId) {
          socket.emit('transcription-error', {
            message: 'meetingId is required',
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
          deepgram,
        })

        io.to(meetingId).emit('transcription-started', {
          meetingId,
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
          message: 'No active session',
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

        const result = await persistTranscriptResult(
          session.meetingId,
          transcript
        )

        // ALWAYS SAFE RESPONSE
        io.to(meetingId).emit('transcriptions', {
          meetingId,
          transcript: result?.transcription,
          ai: result?.ai,
        })
      } catch (error) {
        console.error(error)
        socket.emit('transcription-error', {
          meetingId,
          message: 'Processing failed',
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
