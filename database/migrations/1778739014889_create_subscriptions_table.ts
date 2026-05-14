import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('userId').references('uuid').inTable('users').onDelete('CASCADE')
      table.boolean('isSubscribed').defaultTo(false)
      table.timestamp('subscriptionExpiresAt').nullable()
      table.string('stripeCustomerId').nullable()
      table.string('stripeSubscriptionId').nullable()
      table.timestamp('createdAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
      table.timestamp('updatedAt', { useTz: true, precision: 6 }).defaultTo(this.now(6))
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}