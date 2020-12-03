import { Request, Response } from 'express'

import isValidUuidv4 from '../utils/validUuidv4'

import CategoriesCallsService from 'src/services/categoriesCallsService'

const categoriesCallsService = new CategoriesCallsService()

export default class CategoriesCallsController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      await categoriesCallsService.index(res)
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
      await categoriesCallsService.getById(id, res)
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
  }

  async create(req: Request, res: Response) {
    const { category } = req.body
    if (!category) return res.status(400).json({ message: 'Data cannot be empty' })
    try {
      await categoriesCallsService.create({ category }, res)
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
      await categoriesCallsService.delete({ id }, res)
      return res.status(204).send()
    } catch (err) {
      return res.status(500).json({
        message: 'Unexpected error while deleting category'
      })
    }
  }

}