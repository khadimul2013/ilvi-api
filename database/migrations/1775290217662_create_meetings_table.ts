import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'meetings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenant_id').notNullable()
      table
        .foreign('tenant_id')
        .references('uuid')
        .inTable('tenants')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('description').nullable()

      table.timestamp('scheduled_at', { useTz: true }).notNullable()
      table.string('status').notNullable()

      table.uuid('created_by').notNullable()
      table
        .foreign('created_by')
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')

      // REMOVE these (not needed)
      // table.uuid('recording_uuid').nullable()
      // table.uuid('transcription_uuid').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}