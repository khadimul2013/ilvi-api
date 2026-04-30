import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recordings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenant_id').notNullable()
      table
        .foreign('tenant_id')
        .references('uuid')
        .inTable('tenants')
        .onDelete('CASCADE')

      table.uuid('meeting_id').notNullable()
      table
        .foreign('meeting_id')
        .references('uuid')
        .inTable('meetings')
        .onDelete('CASCADE')

      table.string('file_name').nullable()
      table.string('file_url').nullable()

      table.integer('duration').nullable()
      table.integer('size').nullable()
      table.string('mime_type').nullable()

      table.string('status').notNullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}