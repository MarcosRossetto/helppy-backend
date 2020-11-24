import { Router } from 'express'

import UsersController from '@controllers/usersController'
import CategoriesCallsController from '@controllers/categoriesCallsController'


const routes = Router()

const usersController = new UsersController()
const categoriesCallsController = new CategoriesCallsController()

routes.get('/users', usersController.index)
routes.post('/users', usersController.create)

routes.get('/categories-calls', categoriesCallsController.index)
routes.post('/categories-calls', categoriesCallsController.create)

export default routes
