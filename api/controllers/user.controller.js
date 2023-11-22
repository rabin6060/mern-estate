import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
import User from '../models/user.modal.js'

export const test = (req,res) => {
    res.send('test is working..')
}

export const updateUser =async (req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(402,"unauthorized."))
    try {
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)}
        const updateUserInfo = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    avatar:req.body.avatar
                }
            },{new:true})
            const {password,...rest} = updateUserInfo._doc
            res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}