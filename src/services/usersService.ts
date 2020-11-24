import { Response } from 'express'

import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'


interface IUser {
  name: string
  password: string
  email: string,
  cpf: string
}

const userData = ['id', 'name', 'email', 'cpf']

export default class UsersService {
  async index(res: Response) {
    try {
      const users = await db.select(...userData).table('users')
      return res.status(200).json({ users })
    } catch (err) {
      return err.detail
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const user = await db.select(...userData).table('users').where('id', id)
      return res.status(200).json({ user })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }

  async findCpf(cpf: string, res: Response) {
    try {
      const user = await db.select(...userData).table('users').where('cpf', cpf)
      return res.status(200).json({ user })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }

  async create(user: IUser, res: Response) {
    const { name, password, email, cpf } = user
    const encryptedPassword = await bcrypt.hash(password, 10)
    const capitalizedName = capitalizeString(name)
    try {
      await db('users').insert({
        id: uuidv4(),
        name: capitalizedName,
        email,
        cpf: cpf.replace(/\D+/g, ''),
        password: encryptedPassword
      })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
