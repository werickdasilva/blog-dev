import { Request, Response } from 'express'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { prisma } from '../config/prisma'

export default class UserController {

    async create(req: Request, res: Response) {
        const { body } = req

        const createUserDto = new CreateUserDto(body)
        await createUserDto.validate().then(async data => {

            const emailExist = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            })

            if (!!emailExist) {
                return res.status(300).json({
                    error: 'Email exists'
                })
            }

            await prisma.user.create({
                data: {
                    ...data
                },
            });

            return res.sendStatus(200)
        }).catch(error => {
            return res.status(400).json({ error: error.message })
        })
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params

        const user = await prisma.user.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                create_at: true,
                posts: true
            },
        })

        if (!user) {
            return res.status(300).json({
                error: 'User does not exist'
            })
        }

        res.status(200).json(user)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { body } = req

        const user = await prisma.user.findUnique(
            { where: { id: Number(id) } }
        )

        if (!user) {
            return res.status(300).json({ error: 'User does not exist' })
        }

        const updateUser = new UpdateUserDto(body)
        updateUser.validate().then(async data => {
            if (!!data.email) {
                if (user.email === data.email) {
                    data.email = undefined
                } else {

                    const findEmail = await prisma.user.findUnique({
                        where: { email: data.email }
                    })

                    if (!!findEmail) {
                        return res.status(300).json({
                            error: 'Email does not exist'
                        })
                    }
                }
            }

            await prisma.user.update(
                {
                    where: { id: Number(id) },
                    data: {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }
                }
            )

            return res.sendStatus(200)
        }).catch(error => {
            return res.status(300).json({ error: error.message })
        })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
    
        const findUser = await prisma.user.findUnique(
            { where: { id: Number(id) } }
        )

        if(!findUser) {
            return res.status(300).json({
                error:  'Can not delete user because it does not exist '
            })
        }
        await prisma.user.delete({
            where: {id: Number(id)}
        })

        res.sendStatus(200)
    }
}