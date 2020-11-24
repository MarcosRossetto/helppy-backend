import { Response } from 'express'

import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'


interface ICall {
  name: string
  password: string
  email: string,
  cpf: string
}

const userData = ['id', 'name', 'email', 'cpf']

export default class CallsService {
  async index(res: Response) {
    try {
      const users = await db.select(...userData).table('users')
      return res.status(200).json({ users })
    } catch (err) {
      return err.detail
    }
  }
}