const mongoose=require("mongoose")

const signInSchema=new mongoose.Schema({
    Firstname:String,
    Lastname:String,
    Email:String,
    Password:String,
    ConfirmPassword:String
})

const signInModel=mongoose.model("signin",signInSchema)

module.exports=signInModel