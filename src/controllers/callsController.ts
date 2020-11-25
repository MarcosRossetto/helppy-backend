import { Request, Response } from 'express'

import CallsService from 'src/services/callsService'

const callsService = new CallsService()

export default class CallsController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await callsService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { user, description, schedule, category } = req.body
    if (!description || !schedule || !category || !user) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await callsService.create({ user, description, schedule, category }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

}