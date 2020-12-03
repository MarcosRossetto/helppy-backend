import { Request, Response } from 'express'

import isValidEmail from '../utils/validEmail'

import LoginService from 'src/services/loginService'

const loginService = new LoginService()

export default class LoginController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await loginService.index(res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Data cannot be empty' })
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email' })
    try {
      await loginService.create({ email, password }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

}