import * as yup from 'yup'

export const createPostValidation = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    content: yup.string().required(),
    id_user: yup.number().required(),
})

export const updatePostValidation = yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    content: yup.string()
})