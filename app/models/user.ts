import * as schemas from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { beforeSave } from '@adonisjs/lucid/orm'
import { errors } from '@adonisjs/auth'
import BaseModel from './base_model.js'

const UserSchema = schemas.UserSchema ?? BaseModel

export default class User extends UserSchema {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password!)
    }
  }

  // static async verifyCredentials(email: string, password: string) {
  //   const user = await this.findBy('email', email)
  //   if (!user) {
  //     throw new Error('Invalid credentials')
  //   }

  //   const isValid = await hash.verify(user.password!, password)
  //   if (!isValid) {
  //     throw new Error('Invalid credentials')
  //   }

  //   return user
  // }

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
