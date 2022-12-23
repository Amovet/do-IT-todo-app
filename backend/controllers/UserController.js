import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res)=>{
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        //create user
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })
        //save user in mongoDB
        const user = await doc.save();

        //create jst token

        const token = jwt.sign({
                _id: user._id,
            }, `${process.env.SecretOrPrivateKey}`,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash,__v, ...userData} = user._doc //remove unnecessary elem

        res.json({
            ...userData,
            token,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Registration failed'
        })
    }
}

export const login = async (req,res)=>{
    try{
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return  res.status(403).json({massage:'Invalid login or password'})
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return  res.status(403).json({massage:'Invalid login or password'})
        }

        const token = jwt.sign({
                _id: user._id,
            }, `${process.env.SecretOrPrivateKey}`,
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash,__v, ...userData} = user._doc //remove unnecessary elem

        res.json({
            ...userData,
            token,
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            massage:'Login failed'
        })
    }

}

export const auth = async (req, res)=>{
    try{
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(403).json({massage:'auth Fail'})
        }
        const { passwordHash,__v, ...userData} = user._doc //remove unnecessary elem

        res.json(userData)
    }
    catch(err){

    }
}

export const getUserInfo = async (req, res)=>{
    try{
        const user = await UserModel.findById(req.params.id)
        if(!user){
            return res.status(403).json({massage:'Get user info Fail'})
        }
        const { passwordHash,email,_id,createdUrl,updatedAt,createdAt,__v, ...userData} = user._doc //remove unnecessary elem
        res.json(userData)
    }
    catch(err){

    }
}

export const updateUserInfo = async (req, res)=>{

    try{
        await UserModel.updateOne({_id:req.userId},
            {
                email: req.body.email,
                fullName: req.body.fullName,
                avatarUrl: req.body.avatarUrl,
            }
        )
        res.json({
            success:true
        })
    }
    catch(err){
        res.status(500).json({massage:'Error with update user info'},err)
    }
}