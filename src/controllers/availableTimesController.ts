import { Request, Response } from 'express'

import AvailableTimesService from 'src/services/availableTimesService'

const availableTimesService = new AvailableTimesService()

export default class AvailableTimesController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await availableTimesService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { available_time } = req.body
    if (!available_time) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await availableTimesService.create({ available_time }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

}