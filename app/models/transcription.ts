import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'
import Meeting from './meeting.ts'
import Recording from './recording.ts'
import Tenant from './tenant.ts'
import { TranscriptionStatus } from '../Helpers/ENUM.js'

export default class Transcription extends BaseModel {
    @column({ isPrimary: true })
    declare uuid: string

    @beforeCreate()
    static assignUuid(model: Transcription) {
        model.uuid = uuidv4()
    }

    @column()
    declare tenantId: string

    @belongsTo(() => Tenant, {
        foreignKey: 'tenantId',
    })
    declare tenant: BelongsTo<typeof Tenant>

    @column()
    declare meetingId: string

    @column()
    declare recordingId: string

    @belongsTo(() => Meeting, {
        foreignKey: 'meetingId',
    })
    declare meeting: BelongsTo<typeof Meeting>

    @belongsTo(() => Recording, {
        foreignKey: 'recordingId',
    })
    declare recording: BelongsTo<typeof Recording>

    @column()
    declare text?: string

    @column()
    declare summary?: string

    @column()
    declare language: string

    @column()
    declare status: TranscriptionStatus

    @column()
    declare provider?: string

    @column()
    declare aiSummary?: string

    @column()
    declare audioUrl?: string

    @column({
        prepare: (value: any) => JSON.stringify(value || []),
        consume: (value: any) => {
            try {
                return typeof value === 'string' ? JSON.parse(value) : value
            } catch {
                return []
            }
        },
    })
    declare aiActions: string[]

    @column({
        prepare: (value: any) => JSON.stringify(value || []),
        consume: (value: any) => {
            try {
                return typeof value === 'string' ? JSON.parse(value) : value
            } catch {
                return []
            }
        },
    })
    declare aiKeyPoints: string[]

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}