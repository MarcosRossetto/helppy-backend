import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('available_times', table => {
    table.uuid('id').primary().unique()
    table.string('available_time').notNullable()
  })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('available_times')
}