import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Subscription extends BaseModel {
    @column({ isPrimary: true })
    declare uuid: string

    @column({
        columnName: 'userId',
    })
    declare userId: string

    @belongsTo(() => User, {
        foreignKey: 'userId',
    })
    declare user: BelongsTo<typeof User>

    @column()
    declare isSubscribed: boolean

    @column.dateTime()
    declare subscriptionExpiresAt: DateTime | null

    @column()
    declare stripeCustomerId: string | null

    @column()
    declare stripeSubscriptionId: string | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}