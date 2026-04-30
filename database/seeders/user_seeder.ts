import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Tenant from '#models/tenant'
import hash from '@adonisjs/core/services/hash'
import { v4 as uuidv4 } from 'uuid'
import { TenantStatus } from '../../app/Helpers/ENUM.ts'
import { UserStatus } from '../../app/Helpers/ENUM.ts'

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
            fullName: 'Admin User',
            email: 'admin@gmail.com',
            password: '123456',
            status: UserStatus.ACTIVE,
            verified: true,
          },
          {
            fullName: 'Test User',
            email: 'user@gmail.com',
            password: '123456',
            status: UserStatus.ACTIVE,
            verified: true,
          },
        ],
      },
      {
        name: 'Second Company',
        users: [
          {
            fullName: 'Manager User',
            email: 'manager@gmail.com',
            password: '123456',
            status: UserStatus.INACTIVE,
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
          status: TenantStatus.ACTIVE,
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
            fullName: u.fullName,
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