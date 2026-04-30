import { DateTime } from 'luxon'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import User from './user.js'
import Meeting from './meeting.js'
import { STATUS } from '#helpers/enum'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare name: string | null

  @column()
  declare status: STATUS

  @column()
  declare tenantId: string
  @hasMany(() => User, {
    foreignKey: 'tenantId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Meeting, {
    foreignKey: 'tenantId',
  })
  declare meetings: HasMany<typeof Meeting>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
