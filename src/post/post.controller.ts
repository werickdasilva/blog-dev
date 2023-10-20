import { Request, Response } from 'express'
import { CreatePostDto, UpdatePostDto } from './post.dto'
import { prisma } from '../config/prisma'

export default class PostController {

    async create(req: Request, res: Response) {
        const { body } = req

        const createPostValidate = new CreatePostDto(body)
        createPostValidate.validate().then(async data => {
            const findUser = await prisma.user.findUnique({
                where: {
                    id: data.id_user
                }
            })

            if (!findUser) {
                return res.status(404).json({
                    error: 'User not found'
                })
            }

            await prisma.post.create({
                data: {
                    title: data.title,
                    content: data.content,
                    description: data.description,
                    author_id: data.id_user
                }
            })
            return res.sendStatus(200)

        }).catch(error => {
            return res.status(404).json({
                error: error.message
            })
        })
    }
    async  findAll(req: Request, res: Response) {
        return res.status(200).json(
            await prisma.post.findMany()
        )
    }
    async findById(req: Request, res: Response) {
        const { id } = req.params

        const findUser = await prisma.post.findUnique({
            where: { id: Number(id) },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        if (findUser) {
            return res.status(200).json(findUser)
        }

        return res.status(404).json({
                error: 'Post not found'
            }
        )
    }

    async update(req: Request, res: Response) {
        const {body, params: { id } } = req
        
        const findPost = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!findPost) {
            return res.status(404).json({
                error: 'Post not found'
            })
        }

        const postValidate = new UpdatePostDto(body)

        postValidate.validate().then(async data => {
            const postUpdate = await prisma.post.update({
                where:{ id : Number(id)},
                data: {
                    ...data
                }
            })

            res.status(200).json(postUpdate)
        }).catch(error => {
            return res.status(400).json({
                error: error.message
            })
        })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        
        const findPost = await prisma.post.findUnique({
            where: {id: Number(id)}
        })

        if (!findPost) {
            return res.status(404).json({
                error: 'Post not found'
            })
        }

        await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })

        return res.sendStatus(200)
    }
}