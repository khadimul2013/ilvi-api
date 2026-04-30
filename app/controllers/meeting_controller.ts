import type { HttpContext } from '@adonisjs/core/http'
import Meeting from '#models/meeting'
import Recording from '#models/recording'
import { uploadToS3 } from '#services/s3_service'
import { meetingValidator, uploadAudioValidator } from '#validators/meeting'
import { DateTime } from 'luxon'
import { RecordingStatus } from '../Helpers/ENUM.ts'

export default class MeetingsController {
    async store({ request, auth, response }: HttpContext) {
        const user = auth.user!
        const payload = await request.validateUsing(meetingValidator)

        const meeting = await Meeting.create({
            ...payload,
            scheduledAt: DateTime.fromISO(payload.scheduledAt),
            tenantId: user.tenantId,
            createdBy: user.uuid,
        })
        return response.created({
            data: meeting,
            message: 'Meeting created successfully',
            success: true,
            status: 201,
        })
    }

    async index({ auth, response }: HttpContext) {
        const user = auth.user!

        const meetings = await Meeting.query()
            .where('tenantId', user.tenantId)
            .where('createdBy', user.uuid)
            .preload('recording')

        return response.ok({
            data: meetings,
            message: 'Meetings retrieved successfully',
            success: true,
            status: 200,
        })
    }

    async update({ params, request, auth, response }: HttpContext) {
        try {
            const user = auth.user!
            const meetingId = params.id

            const payload = await request.validateUsing(meetingValidator)

            const meeting = await Meeting.query()
                .where('uuid', meetingId)
                .where('tenantId', user.tenantId)
                .first()

            if (!meeting) {
                return response.notFound({
                    data: null,
                    message: 'Meeting not found',
                    success: false,
                    status: 404,

                })
            }

            meeting.title = payload.title
            meeting.description = payload.description || meeting.description
            meeting.status = payload.status || meeting.status

            if (payload.scheduledAt) {
                meeting.scheduledAt = DateTime.fromISO(payload.scheduledAt)
            }
            await meeting.save()

            return response.ok({
                data: meeting,
                message: 'Meeting updated successfully',
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

    async uploadAudio({ request, response, auth }: HttpContext) {
        try {
            const user = auth.user!
            const file = request.file('audio', {
                size: '50mb',
                extnames: ['mp3', 'wav', 'm4a'],
            })

            if (!file || !file.isValid) {
                return response.badRequest({
                    data: null,
                    message: 'Invalid audio file',
                    success: false,
                    status: 400,
                })
            }

            const { recordingId } = await request.validateUsing(uploadAudioValidator)

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

            if (recording.status === 'UPLOADED') {
                return response.badRequest({
                    data: null,
                    message: 'Audio already uploaded for this recording',
                    success: false,
                    status: 400,
                })
            }

            const { fileKey, fileUrl } = await uploadToS3(file)

            recording.fileName = fileKey
            recording.fileUrl = fileUrl
            recording.status = RecordingStatus.UPLOADED

            await recording.save()

            return response.ok({
                data: recording,
                message: 'Audio uploaded successfully',
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