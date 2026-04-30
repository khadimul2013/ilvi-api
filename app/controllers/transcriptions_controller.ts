import type { HttpContext } from '@adonisjs/core/http'
import Transcription from '#models/transcription'
import Upload from '#models/upload'
import Summary from '#models/summary'

export default class TranscriptionsController {
  async showByUpload({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const uploadId = params.uploadId

      const upload = await Upload.query()
        .where('uuid', uploadId)
        .where('uploadedBy', user.uuid)
        .first()

      if (!upload) {
        return response.notFound({
          data: null,
          message: 'Upload not found',
          success: false,
          status: 404,
        })
      }

      const transcriptions = await Transcription.query()
        .where('uploadId', upload.uuid)
        .where('tenantId', user.tenantId)
        .orderBy('createdAt', 'desc')

      if (transcriptions.length === 0) {
        return response.notFound({
          data: null,
          message: 'Transcription not found',
          success: false,
          status: 404,
        })
      }

      return response.ok({
        data: await Promise.all(
          transcriptions.map(async (t) => {
            const summary = await Summary.query()
              .where('meetingId', t.meetingId)
              .where('tenantId', user.tenantId)
              .first()

            return {
              uuid: t.uuid,
              meetingId: t.meetingId,
              uploadId: t.uploadId,
              summary: summary?.summary || '',
              actions: summary?.actions || [],
              keyPoints: summary?.keyPoints || [],
              transcript: t.text || '',
              language: t.language,
              status: t.status,
              provider: t.provider,
              createdAt: t.createdAt,
            }
          })
        ),
        message: 'Transcriptions fetched successfully',
        success: true,
        status: 200,
      })
    } catch (error: any) {
      return response.badRequest({
        data: null,
        message: error.message,
        success: false,
        status: 400,
      })
    }
  }

  async index({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!

      const page = request.input('page', 1)
      const limit = request.input('limit', 10)

      const transcriptions = await Transcription.query()
        .where('tenantId', user.tenantId)
        .orderBy('createdAt', 'desc')
        .paginate(page, limit)

      return response.ok({
        data: await Promise.all(
          transcriptions.all().map(async (t) => {
            const summary = await Summary.query()
              .where('meetingId', t.meetingId)
              .where('tenantId', user.tenantId)
              .first()

            return {
              uuid: t.uuid,
              meetingId: t.meetingId,
              uploadId: t.uploadId,
              summary: summary?.summary || '',
              actions: summary?.actions || [],
              keyPoints: summary?.keyPoints || [],
              transcript: t.text || '',
              language: t.language,
              status: t.status,
              provider: t.provider,
              createdAt: t.createdAt,
            }
          })
        ),
        meta: transcriptions.getMeta(),
        message: 'All transcriptions fetched successfully',
        success: true,
        status: 200,
      })
    } catch (error: any) {
      return response.badRequest({
        data: null,
        message: error.message,
        success: false,
        status: 400,
      })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const id = params.id

      const transcription = await Transcription.query()
        .where('uuid', id)
        .where('tenantId', user.tenantId)
        .first()

      if (!transcription) {
        return response.notFound({
          data: null,
          message: 'Transcription not found',
          success: false,
          status: 404,
        })
      }

      await transcription.delete()

      return response.ok({
        data: null,
        message: 'Transcription deleted successfully',
        success: true,
        status: 200,
      })
    } catch (error: any) {
      return response.badRequest({
        data: null,
        message: error.message,
        success: false,
        status: 400,
      })
    }
  }
}
