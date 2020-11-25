import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'

interface ISchedule {
  schedule: string,
}

export default class SchedulesService {
  async index(res: Response) {
    try {
      const schedule = await db.select('*').table('schedules')
      return res.status(200).json({ schedule })
    } catch (err) {
      return err.detail
    }
  }

  async create(schedules: ISchedule, res: Response) {
    const { schedule } = schedules
    const capitalizedName = capitalizeString(schedule)
    try {
      await db('schedules').insert({
        id: uuidv4(),
        schedule: capitalizedName,
      })
    } catch (err) {
      return res.status(400).json({
        msg: err,
        message: err.detail
      })
    }
  }
}
