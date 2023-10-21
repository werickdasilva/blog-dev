import jsonwebtoken from 'jsonwebtoken'
import { secret } from './token'

class AuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'Auth Error'
    }
}

export const auth = (authorization: string) => {
    if (!authorization) {
        throw new AuthError('You need to be logged in to access this resource')
    }

    const token = authorization.replace('Bearer ', '')

    try {
        const {user_id} = jsonwebtoken.verify(token, secret) as JwtPayloadUser

        return {user_id}
    } catch (e) {
        throw new AuthError('Not Authorized')
    }
}

interface JwtPayloadUser extends jsonwebtoken.JwtPayload {
    user_id: number
}
