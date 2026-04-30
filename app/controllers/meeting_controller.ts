import type { HttpContext } from '@adonisjs/core/http'
import Meeting from '#models/meeting'
import Upload from '#models/upload'
import drive from '@adonisjs/drive/services/main'
import { meetingValidator, uploadAudioValidator } from '#validators/meeting'
import { MEETING_STATUS } from '#helpers/enum'
import { existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

export default class MeetingsController {
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(meetingValidator)

    const meeting = await Meeting.create({
      ...payload,
      title: payload.title ?? 'Untitled conversation',
      language: payload.language ?? 'en',
      status: payload.status ?? MEETING_STATUS.PENDING,
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
      .preload('attachments')
      .preload('transcriptions')
      .preload('summary')
      .orderBy('createdAt', 'desc')

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

      if (payload.title) {
        meeting.title = payload.title
      }
      if (payload.language) {
        meeting.language = payload.language
      }
      meeting.status = payload.status || meeting.status

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

      const { meetingId } = await request.validateUsing(uploadAudioValidator)

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

      if (!file.tmpPath || !existsSync(file.tmpPath)) {
        throw new Error('File not found on server')
      }

      const fileKey = `uploads/${Date.now()}-${randomUUID()}.${file.extname}`
      const disk = drive.use('s3')

      await disk.copyFromFs(file.tmpPath, fileKey, {
        contentType: file.type,
        visibility: 'public',
      })

      const fileUrl = await disk.getUrl(fileKey)

      const upload = await Upload.create({
        fileName: fileKey,
        originalName: file.clientName,
        mimeType: file.type ?? 'application/octet-stream',
        filePath: fileUrl,
        fileType: file.extname ?? 'audio',
        fileSize: file.size,
        uploadedBy: user.uuid,
      })

      await meeting.related('attachments').attach([upload.uuid])
      meeting.status = MEETING_STATUS.UPLOADED
      await meeting.save()

      return response.ok({
        data: {
          meeting,
          upload,
        },
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
