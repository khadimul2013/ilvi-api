import User from '#models/user'
import {
  signupValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import Tenant from '#models/tenant'
import { v4 as uuid } from 'uuid'
import env from '#start/env'
import * as jwt from 'jsonwebtoken'
import hash from '@adonisjs/core/services/hash'
import { STATUS } from '#helpers/enum'
import mail from '@adonisjs/mail/services/main'
import ResetPasswordNotification from '#mails/reset_password_notification'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const { fullName, firstName, lastName, email, password, companyName } =
      await request.validateUsing(signupValidator)
    const nameParts = fullName?.trim().split(/\s+/) ?? []
    const userFirstName = firstName ?? nameParts.shift() ?? 'User'
    const userLastName = lastName ?? (nameParts.join(' ') || null)

    const existTenant = await Tenant.findBy('name', companyName)
    if (existTenant) {
      return response.badRequest({
        data: null,
        message: 'Company name already exists',
        success: false,
        status: 400,
      })
    }
    const tenant = await Tenant.create({
      uuid: uuid(),
      name: companyName,
      status: STATUS.ACTIVE,
    })

    const user = await User.create({
      firstName: userFirstName,
      lastName: userLastName,
      email,
      password,
      tenantId: tenant.uuid,
      companyName,
      color: '#000000',
      locale: 'en',
      status: STATUS.ACTIVE,
      verified: true,
    })

    return response.created({
      data: user,
      message: 'User registered successfully',
      success: true,
      status: 201,
    })
  }

  async signin(ctx: HttpContext) {
    const { request, response } = ctx
    const { email, password } = await request.validateUsing(loginValidator)
    // const tenantId = ctx.tenantId
    // console.log(tenantId, 'TENANT');

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      data: {
        user,
        token: token.value!.release(),
      },
      message: 'Login successful',
      success: true,
      status: 200,
    })
  }

  async forgotPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', email)
    if (!user) {
      return response.notFound({
        data: null,
        message: 'User not found',
        success: false,
        status: 404,
      })
    }
    if (user.status !== STATUS.ACTIVE) {
      return response.badRequest({
        data: null,
        message: 'User is inactive',
        success: false,
        status: 400,
      })
    }
    if (!user.verified) {
      return response.badRequest({
        data: null,
        message: 'User not verified',
        success: false,
        status: 400,
      })
    }

    const JWT_SECRET = env.get('JWT_SECRET')
    const password = user.password ?? ''
    const secret = JWT_SECRET + password

    const token = jwt.default.sign({ user_id: user.uuid, email: user.email }, secret, {
      expiresIn: '15m',
    })

    const resetLink = `http://117.242.148.188:8085/reset-password/${user.uuid}/${token}`
    await mail.send(new ResetPasswordNotification(user.email, user.firstName ?? 'User', resetLink))
    return response.ok({
      data: null,
      message: 'Password reset link sent to your email',
      success: true,
      status: 200,
    })
  }

  async resetPassword({ request, response }: HttpContext) {
    const { id, token, password, confirmPassword } =
      await request.validateUsing(resetPasswordValidator)

    if (password !== confirmPassword) {
      return response.badRequest({
        data: null,
        message: 'Passwords do not match',
        success: false,
        status: 400,
      })
    }

    const user = await User.find(id)
    if (!user) {
      return response.notFound({
        data: null,
        message: 'User not found',
        success: false,
        status: 404,
      })
    }

    const secret = env.get('JWT_SECRET')! + (user.password ?? '')
    try {
      const payload: any = jwt.default.verify(token, secret)
      if (payload.email !== user.email || payload.user_id !== user.uuid) {
        return response.badRequest({
          data: null,
          message: 'Invalid token',
          success: false,
          status: 400,
        })
      }
    } catch (error) {
      return response.badRequest({
        data: null,
        message: 'Token expired or invalid',
        success: false,
        status: 400,
      })
    }

    user.password = password
    await user.save()

    return response.ok({
      data: null,
      message: 'Password reset successful',
      success: true,
      status: 200,
    })
  }

  async changePassword({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({
        data: null,
        message: 'Unauthorized',
        success: false,
        status: 401,
      })
    }

    const { currentPassword, newPassword, confirmPassword } =
      await request.validateUsing(changePasswordValidator)

    if (newPassword !== confirmPassword) {
      return response.badRequest({
        data: null,
        message: 'Passwords do not match',
        success: false,
        status: 400,
      })
    }

    const isValid = await hash.verify(user.password!, currentPassword)
    if (!isValid) {
      return response.badRequest({
        data: null,
        message: 'Current password incorrect',
        success: false,
        status: 400,
      })
    }

    user.password = newPassword
    await user.save()

    return {
      data: null,
      message: 'Password changed successfully',
      success: true,
      status: 200,
    }
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.user
    if (user?.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      data: null,
      message: 'Logged out successfully',
      success: true,
      status: 200,
    }
  }
}
