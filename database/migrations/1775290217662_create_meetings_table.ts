import { MEETING_STATUS } from '#helpers/enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'meetings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary().notNullable()
      table.uuid('tenantId').nullable().references('uuid').inTable('tenants').onDelete('CASCADE')
      table.uuid('createdBy').nullable().references('uuid').inTable('users').onDelete('SET NULL')
      table.string('title').nullable()
      table.string('language').notNullable().defaultTo('en')
      table
        .enum('status', [
          MEETING_STATUS.PENDING,
          MEETING_STATUS.RECORDING,
          MEETING_STATUS.UPLOADED,
          MEETING_STATUS.PROCESSING,
          MEETING_STATUS.COMPLETED,
          MEETING_STATUS.FAILED,
        ])
        .defaultTo(MEETING_STATUS.PENDING)
      table.integer('duration').nullable()
      table.timestamp('startedAt', { useTz: true, precision: 6 }).nullable()
      table.timestamp('stoppedAt', { useTz: true, precision: 6 }).nullable()
      table.timestamp('processedAt', { useTz: true, precision: 6 }).nullable()
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
