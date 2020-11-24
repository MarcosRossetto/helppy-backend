import { Router } from 'express'

import UsersController from '@controllers/usersController'


const routes = Router()

const usersController = new UsersController()

routes.get('/users', usersController.index)
routes.get('/users/id/:id', usersController.findOne)
routes.get('/users/cpf/:cpf', usersController.findCpf)
routes.post('/users', usersController.create)

export default routes
