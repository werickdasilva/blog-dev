import { Router } from 'express'
import LoginController from './login.controller'
import { signValidate, validate } from './login.validate'

const router = Router()

const loginController = new LoginController()

router.post('/sign', validate(signValidate), loginController.sign);

export default router