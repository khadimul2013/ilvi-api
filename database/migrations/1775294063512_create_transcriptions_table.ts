import { TRANSCRIPTION_STATUS } from '#helpers/enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transcriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('tenantId').references('uuid').inTable('tenants').onDelete('CASCADE')
      table.uuid('meetingId').references('uuid').inTable('meetings').onDelete('CASCADE')
      table.uuid('uploadId').references('uuid').inTable('uploads').onDelete('CASCADE')
      table.text('text').nullable()
      table.string('language').notNullable()
      table
        .enum('status', [
          TRANSCRIPTION_STATUS.PENDING,
          TRANSCRIPTION_STATUS.PROCESSING,
          TRANSCRIPTION_STATUS.COMPLETED,
          TRANSCRIPTION_STATUS.FAILED,
        ])
        .defaultTo(TRANSCRIPTION_STATUS.PENDING)
      table.string('provider').nullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
