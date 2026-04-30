import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_has_roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable()
      table
        .foreign('user_id')
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')
      table.uuid('role_id').notNullable()
      table
        .foreign('role_id')
        .references('uuid')
        .inTable('roles')
        .onDelete('CASCADE')
      table.primary(['user_id', 'role_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
