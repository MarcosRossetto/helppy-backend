import Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('login_admin', table => {
    table.uuid('id').primary().notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('login_admin')
}