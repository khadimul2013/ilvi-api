import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'model_has_uploads'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('modelId').notNullable()
      table.uuid('uploadId').references('uuid').inTable('uploads').onDelete('CASCADE')
      table.unique(['modelId', 'uploadId'])
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
