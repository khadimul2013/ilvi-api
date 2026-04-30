import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'
import Meeting from './meeting.js'
import Tenant from './tenant.ts'
import Transcription from './transcription.ts'

export default class Recording extends BaseModel {
    @column({ isPrimary: true })
    declare uuid: string

    @beforeCreate()
    static assignUuid(recording: Recording) {
        recording.uuid = uuidv4()
    }

    @hasOne(() => Transcription, {
        foreignKey: 'recordingId',
    })
    declare transcription: HasOne<typeof Transcription>

    @column()
    declare meetingId: string

    @column()
    declare tenantId: string

    @belongsTo(() => Tenant, {
        foreignKey: 'tenantId',
    })
    declare tenant: BelongsTo<typeof Tenant>


    // FIX: use string reference instead of import()
    @belongsTo(() => Meeting, {
        foreignKey: 'meetingId',
    })
    declare meeting: BelongsTo<typeof Meeting>

    @column()
    declare fileName: string

    @column()
    declare fileUrl: string

    @column()
    declare duration?: number

    @column()
    declare size?: number

    @column()
    declare mimeType?: string

    @column()
    declare status: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}