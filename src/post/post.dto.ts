import { createPostValidation, updatePostValidation } from "./post.validate"

type CreatePost = {
    title: string
    description: string
    content: string
    id_user: number
}

export class CreatePostDto {
    title: string
    description: string
    content: string
    id_user: number

    constructor(body: CreatePost) {
        this.title = body.title
        this.description = body.description
        this.content = body.content
        this.id_user = body.id_user
    }

    validate(): Promise<CreatePost> {
        return createPostValidation.validate({
            ...this
        })
    }
}


type UpdatePost = {
    title?: string
    description?: string
    content?: string
}

export class UpdatePostDto {
    title?: string
    description?: string
    content?: string

    constructor(body:  UpdatePost) {
        this.title = body.title
        this.description = body.description
        this.content = body.content
    }

    validate(): Promise<UpdatePost> {
        return updatePostValidation.validate({
            ...this
        })
    }
}