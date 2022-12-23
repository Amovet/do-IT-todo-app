import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Email was entered incorrectly').isEmail(),
    body('password', 'Password must contain more than 8 characters').isLength({min:8}),
]

export const registerValidation = [
    body('email', 'Email was entered incorrectly').isEmail(),
    body('password', 'Password must contain more than 8 characters').isLength({min:8}),
    body('fullName', 'Name must contain more than 3 characters').isLength({min:3}),
    body('avatarUrl', 'link was entered incorrectly').optional().isString(),
]

export const userUpdateValidation = [
    body('fullName', 'Name must contain more than 3 characters').optional().isLength({min:3}),
    body('avatarUrl', 'link was entered incorrectly').optional().isString(),
]
