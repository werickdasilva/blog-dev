import { createValidationUser, updateValidationUser } from "./user.validate"

type CreateUser = {
    name: string
    email: string
    password: string
}

export class CreateUserDto {
    name: string
    email: string
    password: string

    constructor(body: CreateUser) {
        this.name = body.name
        this.email = body.email
        this.password = body.password
    }

    validate() : Promise<CreateUser> {
        return createValidationUser.validate({...this})
    }
}


type UpdateUser = {
    name?: string
    email?: string
    password?: string
}

export class UpdateUserDto {
    name?: string
    email?: string
    password?: string

    constructor(body: UpdateUser) {
        this.name = body.name
        this.email = body.email
        this.password = body.password
    }

    validate() : Promise<UpdateUser> {
        return updateValidationUser.validate({...this})
    }
}