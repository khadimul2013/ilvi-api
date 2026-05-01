import { DateTime } from 'luxon'
import { column, beforeSave, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { errors } from '@adonisjs/auth'
import BaseModel from './base_model.js'
import Tenant from './tenant.js'
import { STATUS } from '#helpers/enum'

export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare tenantId: string

  @belongsTo(() => Tenant, {
    foreignKey: 'tenantId',
  })
  declare tenant: BelongsTo<typeof Tenant>

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

  @column()
  declare password: string | null

  @column()
  declare phone: string | null

  @column()
  declare status: STATUS

  @column()
  declare verified: boolean

  @column.dateTime({
    autoCreate: true,
    columnName: 'createdAt',
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: 'updatedAt',
  })
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