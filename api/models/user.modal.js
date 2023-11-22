import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png"
    }
},{timestamps:true})

const userModel = mongoose.model('User',userSchema)
export default userModel