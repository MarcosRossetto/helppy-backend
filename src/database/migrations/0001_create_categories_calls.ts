import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('categories_calls', table => {
    table.uuid('id').primary().unique()
    table.string('category').notNullable()
  })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('categories_calls')
}