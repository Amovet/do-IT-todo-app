import {body} from "express-validator";

export const  toDoCreateValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').isLength({min:5}),
    body('description', 'Description was entered incorrectly (must contain more than 10 characters)').optional().isLength({min:10}),
    body('endTime', 'End time was entered incorrectly').optional().isString(),
    body('importance', 'Importance was entered incorrectly').optional().isString(),
    body('filesUrl', 'Upload files error').optional().isArray(),
    body('status', 'Add status error').isString(),
    body('isDone', 'Add IsDone error').isString(),

]


export const  toDoUpdateValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').optional().isLength({min:5}),
    body('description', 'Description was entered incorrectly (must contain more than 10 characters)').optional().isLength({min:10}),
    body('endTime', 'End time was entered incorrectly').optional().isString(),
    body('importance', 'Importance was entered incorrectly').optional().isString(),
    body('filesUrl', 'Upload files error').optional().isArray(),
    body('status', 'Add status error').optional().isString(),
    body('isDone', 'Add IsDone error').optional().isString(),
]

export const  sideToDoCreateValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').isLength({min:5}),
    body('isDone', 'Add IsDone error').optional().isString(),
    body('todoID', 'Add parent error').optional().isString(),
]

export const  sideToDoUpdateValidation = [
    body('title', 'Title was entered incorrectly (must contain more than 5 characters)').optional().isLength({min:5}),
    body('isDone', 'Add IsDone error').optional().isString(),
    body('todoID', 'Add parent error').optional().isString(),
]