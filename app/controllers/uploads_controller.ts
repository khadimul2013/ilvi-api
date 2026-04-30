import type { HttpContext } from '@adonisjs/core/http'
import Upload from '#models/upload'
import { uploadToS3 } from '#services/s3_service'

export default class UploadsController {
  async store({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const file = request.file('file') ?? request.file('audio')

      if (!file || !file.isValid) {
        return response.badRequest({
          data: null,
          message: 'Invalid file upload',
          success: false,
          status: 400,
        })
      }

      const { fileKey, fileUrl } = await uploadToS3(file)

      const upload = await Upload.create({
        fileName: fileKey,
        originalName: file.clientName,
        mimeType: file.type ?? 'application/octet-stream',
        filePath: fileUrl,
        fileType: file.extname ?? 'unknown',
        fileSize: file.size,
        uploadedBy: user.uuid,
      })

      return response.created({
        data: upload,
        message: 'Upload created successfully',
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

  async index({ auth, request, response }: HttpContext) {
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
      message: 'Uploads retrieved successfully',
      success: true,
      status: 200,
    })
  }

  async destroy({ params, auth, response }: HttpContext) {
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
          message: 'Upload not found',
          success: false,
          status: 404,
        })
      }

      await upload.delete()

      return response.ok({
        data: null,
        message: 'Upload deleted successfully',
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
