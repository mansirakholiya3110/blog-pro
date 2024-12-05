const mongoose=require("mongoose")

const loginSchema=new mongoose.Schema({
    Email:String,
    Password:String
})

const loginModel=mongoose.model("login",loginSchema)

module.exports=loginModel