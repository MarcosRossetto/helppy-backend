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

  async getByUser(req: Request, res: Response): Promise<Response> {
    const { user } = req.params
    if (!user) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await callsService.getByUser(user, res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async getByDate(req: Request, res: Response): Promise<Response> {
    const { from, to } = req.query
    if (!from && !to) return res.status(400).json({ message: 'requires at least one data' })
    try {
      await callsService.getByDate(from, to, res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async getByUserDate(req: Request, res: Response): Promise<Response> {
    const { name, from, to } = req.query
    console.log('name: ' + name, 'from: ', + from, 'to: ', to)
    if (!name) return res.status(400).json({ message: 'Data cannot be empty' })
    if (!from && !to) return res.status(400).json({ message: 'requires at least one data' })
    try {
      await callsService.getByUserDate(name, from, to, res)
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
        message: 'Unexpected error while creating new call'
      })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { solution } = req.body
    if (!id || !solution) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await callsService.update({ id, solution }, res)
      return res.status(204).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while updating call'
      })
    }
  }

}