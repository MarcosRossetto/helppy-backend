import { Request, Response } from 'express'

import CallsService from 'src/services/callsService'

const callsService = new CallsService()

export default class CallsController {
  async index(req: Request, res: Response) {
    try {
      await callsService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }
}