import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'


interface IUser {
  name: string,
  email: string,
  whatsapp: string,
  address: {
    cep: string,
    address: string,
    district: string,
    uf: string,
    number: string
  }
}

const userData = ['id', 'name', 'email', 'whatsapp', 'address']

export default class UsersService {
  async index(res: Response) {
    try {
      const users = await db.select(...userData).table('users')
      return res.status(200).json({ users })
    } catch (err) {
      return err.detail
    }
  }

  async create(user: IUser, res: Response) {
    const { name, email, whatsapp, address } = user
    const capitalizedName = capitalizeString(name)
    try {
      console.log('Aqui', name, email, whatsapp, address)
      await db('users').insert({
        id: uuidv4(),
        name: capitalizedName,
        email,
        whatsapp,
        cep: address.cep,
        address: address.address,
        district: address.district,
        uf: address.uf,
        number: address.number
      })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
