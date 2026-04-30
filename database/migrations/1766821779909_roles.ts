import { STATUS } from '#helpers/enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenantId').notNullable()
      table.foreign('tenantId').references('uuid').inTable('tenants').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.boolean('predefined').defaultTo(false)
      table.string('description').nullable()
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
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.unique(['tenantId', 'slug'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
