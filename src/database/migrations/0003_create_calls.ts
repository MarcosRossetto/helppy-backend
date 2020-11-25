import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('calls', table => {
    table.uuid('id').primary().unique()
    table.string('description').notNullable()
    table.string('solution')
    table.boolean('completed').defaultTo(false)
    table.string('schedule').notNullable()
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable()
    table.string('closing_date')
    table.uuid('category').references('id').inTable('categories_calls').onUpdate('CASCADE').onDelete('CASCADE')
    table.uuid('user').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
  })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('calls')
}