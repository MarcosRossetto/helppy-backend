import { Request, Response } from 'express'

import isValidEmail from '../utils/validEmail'

import UsersService from 'src/services/usersService'

const usersService = new UsersService()

export default class UsersController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await usersService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, address } = req.body
    if (!name || !email || !whatsapp || !address) return res.status(400).json({ message: 'Data cannot be empty' })
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email' })
    try {
      await usersService.create({ name, email, whatsapp, address }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

}