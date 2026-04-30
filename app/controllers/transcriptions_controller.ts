import type { HttpContext } from '@adonisjs/core/http'
import Transcription from '#models/transcription'
import Recording from '#models/recording'

export default class TranscriptionsController {
    async showByRecording({ params, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const recordingId = params.recId

            console.log('Fetching transcription for recording ID:', recordingId, 'User ID:', user.uuid)
            const recording = await Recording.query()
                .where('uuid', recordingId)
                .where('tenantId', user.tenantId)
                .first()

            console.log(recording, 'Recording fetched for ID:', recordingId);
            if (!recording) {
                return response.notFound({
                    data: null,
                    message: 'Recording not found',
                    success: false,
                    status: 404,
                })
            }

            const transcriptions = await Transcription.query()
                .where('recordingId', recording.uuid)
                .where('tenantId', user.tenantId)
                .orderBy('createdAt', 'desc')

            if (!transcriptions) {
                return response.notFound({
                    data: null,
                    message: 'Transcription not found',
                    success: false,
                    status: 404,
                })
            }

            return response.ok({
                data: transcriptions.map((t) => ({
                    summary: t.aiSummary || '',
                    actions: t.aiActions || [],
                    key_points: t.aiKeyPoints || [],
                    transcript: t.text || '',
                })),
                message: 'Transcriptions fetched successfully',
                success: true,
                status: 200,
            })
        } catch (error: any) {
            console.error('CONTROLLER ERROR:', error)
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
                data: transcriptions.all().map((t) => ({
                    uuid: t.uuid,
                    meetingId: t.meetingId,
                    recordingId: t.recordingId,
                    summary: t.aiSummary || '',
                    actions: t.aiActions || [],
                    key_points: t.aiKeyPoints || [],
                    transcript: t.text || '',
                    createdAt: t.createdAt,
                })),
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