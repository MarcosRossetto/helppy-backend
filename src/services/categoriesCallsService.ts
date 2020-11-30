import { Response } from 'express'

import { v4 as uuidv4 } from 'uuid'
import capitalizeString from '../utils/capitalizeString'

import db from '../database/connection'

interface ICategory {
  category: string,
}

const categoryData = ['id', 'category']

export default class CategoriesCallsService {
  async index(res: Response) {
    try {
      const category = await db.select(...categoryData).table('categories_calls')
      return res.status(200).json({ category })
    } catch (err) {
      return err.detail
    }
  }

  async getById(id: string, res: Response) {
    try {
      const category = await db.select('*').table('categories_calls').where('id', id)
      return res.status(200).json({ category })
    } catch (err) {
      return err.detail
    }
  }

  async create(categories: ICategory, res: Response) {
    const { category } = categories
    const capitalizedCategory = capitalizeString(category)
    try {
      await db('categories_calls').insert({
        id: uuidv4(),
        category: capitalizedCategory,
      })
    } catch (err) {
      return res.status(400).json({
        message: err.detail
      })
    }
  }
}
