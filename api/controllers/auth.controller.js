import User from "../models/user.modal.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup =async (req,res,next) => {
    const {username,email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({username,email,password:hashPassword})
    try {
        await newUser.save()
        res.status(201).json("user created sucessfully")
    } catch (error) {
        next(error)
    }
}
export const signin  = async(req,res,next) => {
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) return next(errorHandler(404,"user not found"))
        const passwordCheck = bcrypt.compareSync(password,user.password)
        if (!passwordCheck) return next(errorHandler(401,"wrong credientials."))
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=user._doc
        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
        res.status(200).json("login successfully.")
        
    } catch (error) {
        next(error)
    }
}