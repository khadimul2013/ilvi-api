import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'
import User from './user.js'
import Meeting from './meeting.js'
import { TenantStatus } from '../Helpers/ENUM.ts'

export default class Tenant extends BaseModel {
    @column({ isPrimary: true })
    declare uuid: string

    @beforeCreate()
    static assignUuid(model: Tenant) {
        model.uuid = uuidv4()
    }

    @column()
    declare name: string | null

    @column()
    declare status: TenantStatus

    @column({ columnName: 'tenant_id' })
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