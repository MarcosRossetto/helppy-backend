import { Request, Response } from 'express'

import isValidCPF from '../utils/validCpf'
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

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      await usersService.findOne(id, res)
      return res.status(200).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async findCpf(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params
    try {
      await usersService.findCpf(cpf, res)
      return res.status(200).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { name, password, email, cpf } = req.body
    if (!name || !password || !email || !cpf) return res.status(400).json({ message: 'Data cannot be empty' })
    if (!isValidCPF(cpf)) return res.status(400).json({ message: 'Invalid CPF' })
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid Email' })
    try {
      await usersService.create({ name, password, email, cpf }, res)
      return res.status(201).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while creating new user'
      })
    }
  }

}