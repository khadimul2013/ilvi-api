import { DateTime } from 'luxon'
import { column, belongsTo, hasOne, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import User from './user.ts'
import Transcription from './transcription.ts'
import Tenant from './tenant.ts'
import Upload from './upload.js'
import Summary from './summary.js'

export default class Meeting extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare tenantId: string

  @belongsTo(() => Tenant, {
    foreignKey: 'tenantId',
  })
  declare tenant: BelongsTo<typeof Tenant>

  @column()
  declare title: string | null

  @column()
  declare language: string

  @column()
  declare status: string

  @column()
  declare duration?: number

  @column()
  declare createdBy: string

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator: BelongsTo<typeof User>

  @hasMany(() => Transcription, {
    foreignKey: 'meetingId',
  })
  declare transcriptions: HasMany<typeof Transcription>

  @hasOne(() => Summary, {
    foreignKey: 'meetingId',
  })
  declare summary: HasOne<typeof Summary>

  @manyToMany(() => Upload, {
    localKey: 'uuid',
    pivotForeignKey: 'modelId',
    relatedKey: 'uuid',
    pivotRelatedForeignKey: 'uploadId',
    pivotTable: 'model_has_uploads',
  })
  declare attachments: ManyToMany<typeof Upload>

  @column.dateTime()
  declare startedAt?: DateTime

  @column.dateTime()
  declare stoppedAt?: DateTime

  @column.dateTime()
  declare processedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
