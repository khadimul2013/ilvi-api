import type { HttpContext } from '@adonisjs/core/http'
import Recording from '#models/recording'
import Meeting from '#models/meeting'
import { RecordingStatus } from '../Helpers/ENUM.ts'

export default class RecordingsController {
    async store({ request, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const { meetingId } = request.only(['meetingId'])

            const meeting = await Meeting.query()
                .where('uuid', meetingId)
                .where('tenantId', user.tenantId)
                .first()

            if (!meeting) {
                return response.notFound({
                    data: null,
                    message: 'Meeting not found',
                    success: false,
                    status: 404
                })
            }

            const recording = await Recording.create({
                meetingId: meeting.uuid,
                tenantId: user.tenantId,
                status: RecordingStatus.PENDING,
            })

            return {
                data: recording,
                message: 'Recording created successfully',
                success: true,
                status: 201,

            }
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
        const user = auth.user!

        const page = request.input('page', 1)
        const limit = request.input('limit', 10)

        const recordings = await Recording.query()
            .where('tenantId', user.tenantId)
            .preload('meeting')
            // .preload('transcription')
            .orderBy('createdAt', 'desc')
            .paginate(page, limit)


        return response.ok({
            data: {
                items: recordings,
                total: recordings.total,
            },
            message: 'Recordings retrieved successfully',
            success: true,
            status: 200,
        })
    }

    async destroy({ params, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const recordingId = params.id

            const recording = await Recording.query()
                .where('uuid', recordingId)
                .where('tenantId', user.tenantId)
                .first()

            if (!recording) {
                return response.notFound({
                    data: null,
                    message: 'Recording not found',
                    success: false,
                    status: 404,
                })
            }

            await recording.delete()

            return {
                data: null,
                message: 'Recording deleted successfully',
                success: true,
                status: 200,
            }
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