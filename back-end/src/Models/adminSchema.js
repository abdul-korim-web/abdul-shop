import mongoose from "mongoose";


const adminSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true})

export const  Admin = new mongoose.model("Admin",adminSchema)