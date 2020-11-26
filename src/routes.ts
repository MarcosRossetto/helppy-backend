import { Router } from 'express'

import UsersController from '@controllers/usersController'
import CategoriesCallsController from '@controllers/categoriesCallsController'
import ScheduleController from '@controllers/schedulesController'
import CallsController from '@controllers/callsController'
import ConnectionsController from '@controllers/connectionsController'


const routes = Router()

const usersController = new UsersController()
const categoriesCallsController = new CategoriesCallsController()
const scheduleController = new ScheduleController()
const callsController = new CallsController()
const connectionsController = new ConnectionsController()

routes.get('/users', usersController.index)
routes.post('/users', usersController.create)

routes.get('/categories-calls', categoriesCallsController.index)
routes.post('/categories-calls', categoriesCallsController.create)

routes.get('/schedules', scheduleController.index)
routes.get('/schedules/active', scheduleController.active)
routes.post('/schedules', scheduleController.create)

routes.post('/calls', callsController.create)
routes.get('/calls', callsController.index)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes
