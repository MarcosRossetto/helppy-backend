import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'


interface ICall {
  user: {
    name: string,
    email: string,
    whatsapp: string,
    address: {
      "cep": string,
      "address": string,
      "district": string,
      "uf": string,
      "number": string,
    }
  },
  description: string,
  category: string,
  schedule: string
}


export default class UsersService {
  async index(res: Response) {
    try {
      const users = await db.select('*').table('calls')
      return res.status(200).json({ users })
    } catch (err) {
      return err.detail
    }
  }

  async create(call: ICall, res: Response) {
    const { user, description, category, schedule } = call
    const capitalizedName = capitalizeString(user.name)
    const trx = await db.transaction()
    try {
      const user_exists = await db('users').select('id').where('whatsapp', user.whatsapp)
      if (user_exists[0] !== undefined) {
        await db('calls').insert({
          id: uuidv4(),
          description,
          schedule,
          user: user_exists[0].id,
          category,
        })
        return
      } else {
        await trx('users').insert({
          id: uuidv4(),
          name: capitalizedName,
          email: user.email,
          whatsapp: user.whatsapp,
          cep: user.address.cep,
          address: user.address.address,
          district: user.address.district,
          uf: user.address.uf,
          number: user.address.number
        })

        const user_id = await trx('users').select('id').where('whatsapp', user.whatsapp)
        await trx('calls').insert({
          id: uuidv4(),
          description,
          schedule,
          user: user_id[0].id,
          category,
        })

        await trx('connections').insert({
          user_id: user_id[0].id
        })


        const schedule_active = await trx('schedules').select('active').where('id', schedule)
        if (schedule_active[0].id === true) {
          await trx('schedules').where('id', schedule).update({
            active: false
          })
        } else {
          await trx.rollback()
          return res.status(400).json({
            message: 'time not available'
          })
        }

        trx.commit()
      }
    } catch (err) {
      await trx.rollback()
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
