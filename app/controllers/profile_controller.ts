import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'
import { serialize } from 'node:v8'

export default class ProfileController {
  async show({ auth, response }: HttpContext) {
    return response.ok({
      data: serialize(UserTransformer.transform(auth.getUserOrFail())),
      message: 'Profile retrieved successfully',
      success: true,
      status: 200,
    })
  }
}
