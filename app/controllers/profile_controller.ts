import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ auth, response }: HttpContext) {
    return response.ok({
      data: UserTransformer.transform(auth.getUserOrFail()),
      message: 'Profile retrieved successfully',
      success: true,
      status: 200,
    })
  }
}
