import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.string('name').nullable()
      table
        .enum('status', ['ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED', 'DRAFT'])
        .defaultTo('ACTIVE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updated_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}
