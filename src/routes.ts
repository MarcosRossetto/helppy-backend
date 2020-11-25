import { Router } from 'express'

import UsersController from '@controllers/usersController'
import CategoriesCallsController from '@controllers/categoriesCallsController'
import ScheduleController from '@controllers/schedulesController'
import CallsController from '@controllers/callsController'


const routes = Router()

const usersController = new UsersController()
const categoriesCallsController = new CategoriesCallsController()
const scheduleController = new ScheduleController()
const callsController = new CallsController()

routes.get('/users', usersController.index)
routes.post('/users', usersController.create)

routes.get('/categories-calls', categoriesCallsController.index)
routes.post('/categories-calls', categoriesCallsController.create)

routes.get('/schedules', scheduleController.index)
routes.post('/schedules', scheduleController.create)

routes.post('/calls', callsController.create)
routes.get('/calls', callsController.index)

export default routes
