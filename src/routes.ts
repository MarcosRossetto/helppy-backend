import { Router } from 'express'

import UsersController from '@controllers/usersController'
import CategoriesCallsController from '@controllers/categoriesCallsController'
import AvailableTimesController from '@controllers/availableTimesController'


const routes = Router()

const usersController = new UsersController()
const categoriesCallsController = new CategoriesCallsController()
const availableTimesController = new AvailableTimesController()

routes.get('/users', usersController.index)
routes.post('/users', usersController.create)

routes.get('/categories-calls', categoriesCallsController.index)
routes.post('/categories-calls', categoriesCallsController.create)

routes.get('/available-times', availableTimesController.index)
routes.post('/available-times', availableTimesController.create)

export default routes
