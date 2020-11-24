import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().unique()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('whatsapp').notNullable().unique()
    table.string('cep').notNullable()
    table.string('address').notNullable()
    table.string('district').notNullable()
    table.string('uf').notNullable()
    table.string('number').notNullable()
  })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}