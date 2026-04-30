import drive from '@adonisjs/drive/services/main'
import { existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

export const uploadToS3 = async (file: any) => {
  if (!file || !file.isValid) {
    throw new Error('Invalid file upload')
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

  return {
    fileKey,
    fileUrl,
  }
}
