import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'

interface IAvailableTime {
  available_time: string,
}

const categoryData = ['id', 'available_time']

export default class CategoriesCallsService {
  async index(res: Response) {
    try {
      const available_times = await db.select(...categoryData).table('available_times')
      return res.status(200).json({ available_times })
    } catch (err) {
      return err.detail
    }
  }

  async create(available_times: IAvailableTime, res: Response) {
    const { available_time } = available_times
    const capitalizedName = capitalizeString(available_time)
    try {
      await db('available_times').insert({
        id: uuidv4(),
        available_time: capitalizedName,
      })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
