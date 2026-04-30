import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenant_id').notNullable()
      table
        .foreign('tenant_id')
        .references('uuid')
        .inTable('tenants')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.boolean('predefined').defaultTo(false)
      table.string('description').nullable()
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
      table.timestamp('created_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updated_at', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.unique(['tenant_id', 'slug'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
