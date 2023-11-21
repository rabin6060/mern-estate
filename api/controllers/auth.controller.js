import User from "../models/user.modal.js"
import bcrypt from 'bcryptjs'

export const signup =async (req,res) => {
    const {username,email,password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({username,email,password:hashPassword})
    try {
        await newUser.save()
        res.status(201).json("user created sucessfully")
    } catch (error) {
        res.status(500).json(error.message)
    }

}