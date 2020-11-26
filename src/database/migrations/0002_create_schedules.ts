import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('schedules', table => {
    table.uuid('id').primary().unique()
    table.string('schedule').notNullable()
    table.boolean('active').defaultTo(true)
  })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('schedules')
}