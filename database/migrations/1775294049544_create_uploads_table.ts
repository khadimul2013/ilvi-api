import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'uploads'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary().notNullable()
      table.string('fileName').notNullable()
      table.string('originalName').notNullable()
      table.string('mimeType').notNullable()
      table.string('filePath').notNullable()
      table.string('fileType').notNullable()
      table.integer('fileSize').notNullable()
      table.string('uploadedBy').notNullable()
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
