import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import db from '../database/connection'


interface ILogin {
  email: string,
  password: string,
}

const loginData = ['id', 'email']

export default class LoginService {
  async index(res: Response) {
    try {
      const login = await db.select(...loginData).table('login_admin')
      return res.status(200).json({ login })
    } catch (err) {
      return err.detail
    }
  }

  async create(login: ILogin, res: Response) {
    const { email, password } = login
    try {
      await db('login_admin').insert({
        id: uuidv4(),
        email,
        password: await bcrypt.hash(password, 10)
      })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
