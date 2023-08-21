const express = require('express')
const bcrypt =require('bcrypt')
const jwt= require("jsonwebtoken")

const {userModel} =require("../model/user.model")

const userRouter =express.Router()

userRouter.post("/register", async (req, res) => {

    const {email, password,confirm_Password} = (req.body)
   
    try{
        bcrypt.hash(password,3,async (err,hash) => {
            if(err) res.send(err.message)

            else{
                const newUser = new userModel({
                    
                    email,
                    password: hash,
                    confirm_Password
                })
                await newUser.save()
                res.send("user registered successfully")
            }
        })
    }
    catch(err){
        res.send(err.message)
    }
})



userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try {
        const user =await userModel.find({email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"mock12")
                    res.send({"msg":"logged in","token":token})
                }
                else{
                    res.send({"msg":"something went wrong"})
                
                }
            })
        }
       
      
    } catch (err) {
        res.send({"msg":"something went wrong","err":err.message})
                
    }
})


userRouter.get("/getProfile",async(req,res)=>{
   const getProfile=await userModel.find()
   res.send(getProfile)
})


module.exports={userRouter}