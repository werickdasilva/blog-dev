import { Router } from "express";
import UserController from "./user.controller";

const routes = Router()

const controller = new UserController()

routes.post('/user', controller.create)
routes.get('/user/:id', controller.findById)
routes.put('/user', controller.update)
routes.delete('/user', controller.delete)

export default routes