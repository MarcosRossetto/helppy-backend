module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'postgre',
      database: 'knex_test'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  }
}