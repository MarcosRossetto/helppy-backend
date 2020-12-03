import { Router } from 'express'

import UsersController from '@controllers/usersController'
import CategoriesCallsController from '@controllers/categoriesCallsController'
import ScheduleController from '@controllers/schedulesController'
import CallsController from '@controllers/callsController'
import ConnectionsController from '@controllers/connectionsController'
import LoginController from '@controllers/loginController'


const routes = Router()

const usersController = new UsersController()
const categoriesCallsController = new CategoriesCallsController()
const scheduleController = new ScheduleController()
const callsController = new CallsController()
const connectionsController = new ConnectionsController()
const loginController = new LoginController()

routes.get('/users', usersController.index)
routes.get('/users/:id', usersController.getById)
routes.post('/users', usersController.create)

routes.get('/categories-calls', categoriesCallsController.index)
routes.get('/categories-calls/:id', categoriesCallsController.getById)
routes.post('/categories-calls', categoriesCallsController.create)
routes.delete('/categories-calls/:id', categoriesCallsController.delete)

routes.get('/schedules', scheduleController.index)
routes.get('/schedules/filter/id/:id', scheduleController.getById)
routes.get('/schedules/active', scheduleController.active)
routes.post('/schedules', scheduleController.create)
routes.delete('/schedules/:id', scheduleController.delete)

routes.get('/calls', callsController.index)
routes.get('/calls/filter/user/:user', callsController.getByUser)
routes.get('/calls/filter/date', callsController.getByDate)
routes.get('/calls/date/user', callsController.getByUserDate)

routes.post('/calls', callsController.create)
routes.put('/calls/:id', callsController.update)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

routes.get('/login-admin', loginController.index)
routes.post('/login-admin', loginController.create)

export default routes
