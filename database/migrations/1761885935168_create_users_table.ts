import { STATUS } from '#helpers/enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenantId').notNullable()
      table.foreign('tenantId').references('uuid').inTable('tenants').onDelete('CASCADE')
      table.string('companyName').nullable()
      table.string('color', 10).notNullable()
      table.string('locale').nullable()
      table.string('firstName').notNullable()
      table.string('lastName').nullable()
      table.string('email').notNullable()
      table.string('password').nullable()
      table.string('phone').nullable()

      table
        .enum('status', [
          STATUS.ACTIVE,
          STATUS.INACTIVE,
          STATUS.DELETED,
          STATUS.ARCHIVED,
          STATUS.DRAFT,
          STATUS.BLOCKED,
          STATUS.UNKNOWN,
        ])
        .defaultTo(STATUS.ACTIVE)
      table.boolean('verified').defaultTo(false).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
