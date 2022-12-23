import {body} from "express-validator";

export const  commentValidation = [
    body('text', 'Text was entered incorrectly (must contain more than 5 characters)').isLength({min:5}),
    body('filesUrl', 'Upload files error').optional().isString(),
    body('parentID', 'Add parent commentID error').optional().isString(),
    body('todoID', 'Add parent todoID error').isString(),
]
