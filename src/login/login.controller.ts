import { Request, Response } from 'express'
import { signValidate } from './login.validate'
import { prisma } from '../config/prisma'
import * as bcrypt from 'bcrypt'
import { generateAccessToken, verifyToken } from '../token'

export default class LoginController {

    async sign(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(300).json({
                error: 'Email or password invalid'
            })
        }
        const hash = await bcrypt.compare(password!, user!.password)

        if (hash) {
            const token = generateAccessToken(String(user.id))

            return res.status(200).json({
                token: token
            })
        }

        return res.status(300).json({
            error: 'Email or password invalid'
        })
        
    }
}