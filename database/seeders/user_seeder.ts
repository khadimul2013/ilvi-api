import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Tenant from '#models/tenant'
import hash from '@adonisjs/core/services/hash'
import { v4 as uuidv4 } from 'uuid'
import { STATUS } from '../../app/helpers/enum.ts'

export default class extends BaseSeeder {
  public async run() {
    /**
     * Create multiple companies (tenants)
     * same as signup flow
     */
    const companies = [
      {
        name: 'Auto Company',
        users: [
          {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@gmail.com',
            password: '123456',
            status: STATUS.ACTIVE,
            verified: true,
          },
          {
            firstName: 'Test',
            lastName: 'User',
            email: 'user@gmail.com',
            password: '123456',
            status: STATUS.ACTIVE,
            verified: true,
          },
        ],
      },
      {
        name: 'Second Company',
        users: [
          {
            firstName: 'Manager',
            lastName: 'User',
            email: 'manager@gmail.com',
            password: '123456',
            status: STATUS.INACTIVE,
            verified: false,
          },
        ],
      },
    ]

    for (const company of companies) {
      /**
       *  Prevent duplicate tenant (same as signup validation)
       */
      let tenant = await Tenant.findBy('name', company.name)

      if (!tenant) {
        tenant = await Tenant.create({
          uuid: uuidv4(),
          name: company.name,
          status: STATUS.ACTIVE,
        })
      }

      /**
       * Create users under tenant
       */
      for (const u of company.users) {
        const existUser = await User.findBy('email', u.email)

        if (!existUser) {
          await User.create({
            uuid: uuidv4(),
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            password: await hash.make(u.password),
            tenantId: tenant.uuid,
            companyName: company.name,
            color: '#000000',
            locale: 'en',
            status: u.status,
            verified: u.verified,
          })
        }
      }
    }
  }
}
