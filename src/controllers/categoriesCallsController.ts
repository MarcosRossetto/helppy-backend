import { Request, Response } from 'express'

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

}