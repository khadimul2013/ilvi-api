import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Recording from './recording.ts'
import Transcription from './transcription.ts'
import Tenant from './tenant.ts'
import { v4 as uuidv4 } from 'uuid'

export default class Meeting extends BaseModel {
    @column({ isPrimary: true })
    declare uuid: string

    @beforeCreate()
    static assignUuid(meeting: Meeting) {
        meeting.uuid = uuidv4()
    }

    @column()
    declare tenantId: string

    @belongsTo(() => Tenant, {
        foreignKey: 'tenantId',
    })
    declare tenant: BelongsTo<typeof Tenant>

    @column()
    declare title: string

    @column()
    declare description?: string

    @column.dateTime()
    declare scheduledAt: DateTime

    @column()
    declare status: string

    @column()
    declare createdBy: string

    @belongsTo(() => User, {
        foreignKey: 'createdBy',
    })
    declare creator: BelongsTo<typeof User>

    @hasOne(() => Recording, {
        foreignKey: 'meetingId',
    })
    declare recording: HasOne<typeof Recording>

    @hasOne(() => Transcription, {
        foreignKey: 'meetingId',
    })
    declare transcription: HasOne<typeof Transcription>

    @column()
    declare recordingId?: string

    @column()
    declare transcriptionId?: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}