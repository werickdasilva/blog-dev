import * as yup from 'yup'

export const createValidationUser = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
    email: yup.string().required().email(),
    password: yup.string().min(8).required()
})

export const updateValidationUser = yup.object().shape({
    name: yup.string().min(3).max(50),
    email: yup.string().email(),
    password: yup.string().min(8)
})

