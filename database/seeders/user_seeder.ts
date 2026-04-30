import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Tenant from '#models/tenant'
import { v4 as uuid } from 'uuid'
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
      const tenant = await Tenant.firstOrCreate(
        { name: company.name },
        {
          uuid: uuid(),
          name: company.name,
          status: STATUS.ACTIVE,
        }
      )

      /**
       * Create users under tenant
       */
      for (const u of company.users) {
        await User.updateOrCreate(
          { email: u.email },
          {
            uuid: uuid(),
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            password: u.password,
            tenantId: tenant.uuid,
            companyName: company.name,
            color: '#000000',
            locale: 'en',
            status: u.status,
            verified: u.verified,
          }
        )
      }
    }
  }
}
