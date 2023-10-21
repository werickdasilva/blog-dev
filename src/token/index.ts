import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET!

export const generateAccessToken = (user_id: string) => {
    const expire = process.env.JWT_EXPIRES

    return jwt.sign({user_id: user_id}, secret, {
        expiresIn: expire
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret)
}