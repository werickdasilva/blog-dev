import { Router } from 'express'
import PostController from './post.controller'


const router = Router()

const postController = new PostController()

router.post('/post', postController.create)
router.get('/post', postController.findAll)
router.get('/post/:id', postController.findById)
router.put('/post/:id', postController.update)
router.delete('/post/:id', postController.delete)

export default router