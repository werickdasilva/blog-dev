import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export const signValidate = yup.object().shape({
    email: yup.string().required(),
    password: yup.string()
})

export const validate = (shema: any) => ( req: Request, res: Response, next: NextFunction ) => {
    shema.validate(req.body).then((_: any) => {
        return next()
    }).catch((e: any) => {
        return res.status(401).json({
            error: e.message
        })
    })
}