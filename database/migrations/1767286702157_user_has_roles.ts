import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_has_roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('userId').primary()
      table.foreign('userId').references('uuid').inTable('users').onDelete('CASCADE')
      table.uuid('roleId').primary()
      table.foreign('roleId').references('uuid').inTable('roles').onDelete('CASCADE')
      table.unique(['userId', 'roleId'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
