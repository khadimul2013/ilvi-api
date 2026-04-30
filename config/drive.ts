import env from '#start/env'
import { defineConfig, services } from '@adonisjs/drive'
import type { S3Driver } from '@adonisjs/drive/drivers/s3'

const driveConfig = defineConfig({
  default: env.get('DRIVE_DISK', 's3'),
  services: {
    s3: services.s3({
      credentials: {
        accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: env.get('AWS_REGION'),
      bucket: env.get('AWS_BUCKET'),
      visibility: 'public',
    }),
  },
})

declare module '@adonisjs/drive/types' {
  interface DriveDisks {
    s3: () => S3Driver
  }
}

export default driveConfig
