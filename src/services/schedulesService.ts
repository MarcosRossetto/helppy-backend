import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'

interface ISchedule {
  schedule: string,
}

interface IDelete {
  id: string
}

export default class SchedulesService {
  async index(res: Response) {
    try {
      const schedule = await db.select('*').table('schedules').orderBy('schedule')
      return res.status(200).json({ schedule })
    } catch (err) {
      return err.detail
    }
  }

  async active(res: Response) {
    try {
      const schedule = await db.select('*').table('schedules').where('active', true)
      return res.status(200).json({ schedule })
    } catch (err) {
      return err.detail
    }
  }

  async getById(id: string, res: Response) {
    try {
      const schedule = await db.select('*').table('schedules').where('id', id)
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

  async delete(schedule: IDelete, res: Response) {
    try {
      await db('schedules').where('id', schedule.id).delete()
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
