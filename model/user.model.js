const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    
    email:String,
    password:String,
    confirm_password:String,
})

const userModel= mongoose.model("user",userSchema)

module.exports={userModel}