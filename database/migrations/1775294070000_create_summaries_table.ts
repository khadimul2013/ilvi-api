import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'summaries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenantId').references('uuid').inTable('tenants').onDelete('CASCADE')
      table.uuid('meetingId').references('uuid').inTable('meetings').onDelete('CASCADE')
      table.text('summary').nullable()
      table.json('actions').nullable()
      table.json('keyPoints').nullable()
      table.string('provider').nullable()
      table.string('status').notNullable()
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
