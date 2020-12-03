import { Request, Response } from 'express'

import isValidUuidv4 from '../utils/validUuidv4'

import SchedulesService from 'src/services/schedulesService'

const schedulesService = new SchedulesService()

export default class AvailableTimesController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await schedulesService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Data cannot be empty' })
    if (!isValidUuidv4(id)) return res.status(400).json({ message: 'Invalid ID' })
    try {
      await schedulesService.getById(id, res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async active(req: Request, res: Response): Promise<Response> {
    try {
      await schedulesService.active(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { schedule } = req.body
    if (!schedule) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await schedulesService.create({ schedule }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await schedulesService.delete({ id }, res)
      return res.status(204).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while deleting call'
      })
    }
  }

}