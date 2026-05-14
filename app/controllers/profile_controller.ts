import { profileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'
import Tenant from '#models/tenant'

export default class ProfileController {
  async show({ auth, response, i18n }: HttpContext) {
    return response.ok({
      data: auth.getUserOrFail(),
      message: i18n.formatMessage('messages.success.retrieved', {
        model: 'User profile',
      }),
      success: true,
      status: 200,
    })
  }

  async update({ auth, request, response, i18n }: HttpContext) {
    const user = auth.user!
    const { firstName, lastName, companyName, email, locale, color, phone } = await request.validateUsing(profileValidator)

    if (companyName) {
      const tenant = await Tenant.query()
        .where('name', companyName)
        .whereNot('uuid', user.tenantId)
        .first()

      if (tenant) {
        return response.badRequest({
          data: null,
          message: i18n.formatMessage('messages.error.alreadyExists', {
            model: 'User profile',
          }),
          success: false,
          status: 400,
        })
      }

      await Tenant.query()
        .where('uuid', user.tenantId)
        .update({
          name: companyName,
        })

      user.companyName = companyName
    }

    user.merge({
      firstName: firstName,
      lastName: lastName,
      email: email,
      locale: locale,
      color: color,
      phone: phone,
    })

    await user.save()

    return response.ok({
      data: user,
      message: i18n.formatMessage('messages.success.updated', {
        model: 'User profile',
      }),
      success: true,
      status: 200,
    })
  }

  async destroy({ auth, response, i18n }: HttpContext) {
    const user = auth.user!

    await Tenant.query()
      .where('uuid', user.tenantId)
      .delete()

    await user.delete()

    return response.ok({
      data: null,
      message: i18n.formatMessage('messages.success.deleted', {
        model: 'User profile',
      }),
      success: true,
      status: 200,
    })
  }
}
