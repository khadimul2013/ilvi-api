import { DateTime } from 'luxon'
import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import Meeting from './meeting.js'
import Tenant from './tenant.js'

export default class Summary extends BaseModel {
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

  @belongsTo(() => Meeting, {
    foreignKey: 'meetingId',
  })
  declare meeting: BelongsTo<typeof Meeting>

  @column()
  declare summary?: string

  @column({
    prepare: (value: string[] | undefined) => JSON.stringify(value || []),
    consume: (value: any) => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value
      } catch {
        return []
      }
    },
  })
  declare actions: string[]

  @column({
    prepare: (value: string[] | undefined) => JSON.stringify(value || []),
    consume: (value: any) => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value
      } catch {
        return []
      }
    },
  })
  declare keyPoints: string[]

  @column()
  declare provider?: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
