import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { beforeSave, column, hasOne } from '@adonisjs/lucid/orm'
import { errors } from '@adonisjs/auth'
import BaseModel from './base_model.js'
import { STATUS } from '#helpers/enum'
import Subscription from './subscription.ts'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column()
  declare tenantId: string

  @hasOne(() => Subscription, {
    foreignKey: 'userId',
  })
  declare subscription: HasOne<typeof Subscription>

  @column()
  declare companyName: string | null

  @column()
  declare color: string

  @column()
  declare locale: string | null

  @column()
  declare firstName: string

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string | null

  @column()
  declare phone: string | null

  @column()
  declare status: STATUS

  @column()
  declare verified: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password!)
    }
  }

  static async verifyCredentials(email: string, password: string) {
    const user = await this.findBy('email', email)

    if (!user) {
      throw new errors.E_INVALID_CREDENTIALS('Invalid email or password')
    }

    const isValid = await hash.verify(user.password!, password)

    if (!isValid) {
      throw new errors.E_INVALID_CREDENTIALS('Invalid email or password')
    }

    return user
  }
}
