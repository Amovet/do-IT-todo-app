import {body} from "express-validator";

export const  workspaceValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').isLength({min:5}),
    body('description', 'Description was entered incorrectly (must contain more than 10 characters)').isLength({min:10}),
    body('endTime', 'End time was entered incorrectly').optional().isString(),
    body('backgroundImgUrl', 'Upload files error').optional().isString(),

]

export const workspaceUpdateValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').optional().isLength({min:5}),
    body('description', 'Description was entered incorrectly (must contain more than 10 characters)').optional().isLength({min:10}),
    body('endTime', 'End time was entered incorrectly').optional().isString(),
    body('backgroundImgUrl', 'Upload files error').optional().isString(),

]