import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenant_id').notNullable()
      table
        .foreign('tenant_id')
        .references('uuid')
        .inTable('tenants')
        .onDelete('CASCADE')

      table.string('company_name').nullable()
      table.string('color', 10).notNullable()
      table.string('locale').nullable()
      table.string('full_name').notNullable()
      // table.string('last_name').nullable()
      table.string('email').notNullable()
      table.string('password').nullable()
      table.string('phone').nullable()

      table
        .enum('status', [
          'ACTIVE',
          'INACTIVE',
          'DELETED',
          'ARCHIVED',
          'DRAFT',
          'BLOCKED',
          'UNKNOWN',
        ])
        .defaultTo('ACTIVE')
      table.boolean('verified').defaultTo(false).notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updated_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
