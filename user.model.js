import mongoose from "mongoose";
const  userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     age:{
        type:Number,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },

},{timestamps:true})

const user=mongoose.model("user",userschema);
export default user