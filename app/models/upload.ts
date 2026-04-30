import { DateTime } from 'luxon'
import { column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import User from './user.js'
import Transcription from './transcription.js'

export default class Upload extends BaseModel {
  static table = 'uploads'

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare fileName: string

  @column()
  declare originalName: string

  @column()
  declare mimeType: string

  @column()
  declare filePath: string

  @column()
  declare fileType: string

  @column()
  declare fileSize: number

  @column()
  declare uploadedBy: string

  @belongsTo(() => User, {
    foreignKey: 'uploadedBy',
  })
  declare uploader: BelongsTo<typeof User>

  @hasMany(() => Transcription, {
    foreignKey: 'uploadId',
  })
  declare transcriptions: HasMany<typeof Transcription>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
