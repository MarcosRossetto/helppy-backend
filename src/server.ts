import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

dotenv.config()

import routes from './routes'

const PORT = process.env.PORT || 3333

const app = express()

app.use(morgan('dev'))
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`\u{2705} Server running at http://localhost:${PORT} \u{2705}`)
})