import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import Meeting from './meeting.ts'
import Upload from './upload.js'
import Tenant from './tenant.ts'
import { TRANSCRIPTION_STATUS } from '#helpers/enum'

export default class Transcription extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare tenantId: string

  @belongsTo(() => Tenant, {
    foreignKey: 'tenantId',
  })
  declare tenant: BelongsTo<typeof Tenant>

  @column()
  declare meetingId: string

  @column()
  declare uploadId: string

  @belongsTo(() => Meeting, {
    foreignKey: 'meetingId',
  })
  declare meeting: BelongsTo<typeof Meeting>

  @belongsTo(() => Upload, {
    foreignKey: 'uploadId',
  })
  declare upload: BelongsTo<typeof Upload>

  @column()
  declare text?: string

  @column()
  declare language: string

  @column()
  declare status: TRANSCRIPTION_STATUS

  @column()
  declare provider?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
