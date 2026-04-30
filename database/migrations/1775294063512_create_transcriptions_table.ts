import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transcriptions'

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

      table.uuid('recording_id').notNullable()
      table
        .foreign('recording_id')
        .references('uuid')
        .inTable('recordings')
        .onDelete('CASCADE')

      table.text('text').nullable()
      table.text('summary').nullable()

      table.string('language').notNullable()
      table.string('status').notNullable()
      table.string('provider').nullable()

      table.text('ai_summary').nullable()
      table.json('ai_actions').nullable()
      table.json('ai_key_points').nullable()

      table.string('audio_url').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}