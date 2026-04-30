import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createReadStream, existsSync } from 'fs'
import { randomUUID } from 'crypto'
import env from '#start/env'


const s3 = new S3Client({
    region: env.get('AWS_REGION'),
    credentials: {
        accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
    },
})

export async function uploadToS3(file: any) {
    if (!file || !file.isValid) {
        throw new Error('Invalid file upload')
    }

    if (!file.tmpPath || !existsSync(file.tmpPath)) {
        throw new Error('File not found on server')
    }

    const fileKey = `uploads/${Date.now()}-${randomUUID()}.${file.extname}`
    const command = new PutObjectCommand({
        Bucket: env.get('AWS_BUCKET'),
        Key: fileKey,
        Body: createReadStream(file.tmpPath),
        ContentType: file.type,
    })

    await s3.send(command)
    // safer URL generation
    const fileUrl = `https://${env.get('AWS_BUCKET')}.s3.${env.get('AWS_REGION')}.amazonaws.com/${fileKey}`
    console.log('File uploaded to S3:', fileUrl)
    return {
        fileKey,
        fileUrl,
    }
}