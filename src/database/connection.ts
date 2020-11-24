import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const db = knex({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
})

export default db
