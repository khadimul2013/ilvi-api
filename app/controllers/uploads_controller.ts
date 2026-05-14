import type { HttpContext } from '@adonisjs/core/http'
import Upload from '#models/upload'
import drive from '@adonisjs/drive/services/main'
import { existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import Meeting from '#models/meeting'

export default class UploadsController {
  async store({ request, auth, response, i18n }: HttpContext) {
    try {
      const user = auth.user!
      const file = request.file('file') ?? request.file('audio')

      if (!file || !file.isValid) {
        return response.badRequest({
          data: null,
          message: i18n.formatMessage('messages.error.invalidFile'),
          success: false,
          status: 400,
        })
      }

      if (!file.tmpPath || !existsSync(file.tmpPath)) {
        return response.badRequest({
          data: null,
          message: i18n.formatMessage('messages.error.fileNotFound'),
          success: false,
          status: 400,
        })
      }

      const fileKey = `uploads/${Date.now()}-${randomUUID()}.webm`
      const disk = drive.use('s3')
      await disk.put(
        fileKey,
        await readFile(file.tmpPath),
        {
          contentType: 'audio/webm',
        }
      )

      const fileUrl = await disk.getUrl(fileKey)

      const upload = await Upload.create({
        fileName: fileKey,
        originalName: file.clientName,
        mimeType: 'audio/webm',
        filePath: fileUrl,
        fileType: 'audio',
        fileSize: file.size,
        uploadedBy: user.uuid,
      })

      const meetingId = request.input('meetingId')
      if (meetingId) {
        const meeting = await Meeting.find(meetingId)

        if (meeting) {
          await meeting.related('attachments').attach({
            [upload.uuid]: {},
          })

        }
      }

      return response.created({
        data: upload,
        message: i18n.formatMessage('messages.success.uploaded', {
          model: 'Upload',
        }),
        success: true,
        status: 201,
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
  async index({ auth, request, response, i18n }: HttpContext) {
    const user = auth.user!

    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const uploads = await Upload.query()
      .where('uploadedBy', user.uuid)
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)

    return response.ok({
      data: {
        items: uploads,
        total: uploads.total,
      },
      message: i18n.formatMessage('messages.success.retrieved', {
        model: 'Uploads',
      }),
      success: true,
      status: 200,
    })
  }

  async destroy({ params, auth, response, i18n }: HttpContext) {
    try {
      const user = auth.user!
      const uploadId = params.id

      const upload = await Upload.query()
        .where('uuid', uploadId)
        .where('uploadedBy', user.uuid)
        .first()

      if (!upload) {
        return response.notFound({
          data: null,
          message: i18n.formatMessage('messages.error.notFound', {
            model: 'Upload',
          }),
          success: false,
          status: 404,
        })
      }

      await upload.delete()

      return response.ok({
        data: null,
        message: i18n.formatMessage('messages.success.deleted', {
          model: 'Upload',
        }),
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
