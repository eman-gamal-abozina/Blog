import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//why we put 2 ..
//register
export const register=async(req,res)=>{
    try{
    const{username,email,password}=req.body
    const userExist=await User.findOne({email:email})
    if(userExist){
        return res.status(400).json({message:"Email already exist"})
    }
    const hashedPassword= await bcrypt.hash(password,10)
    const newUser=await User.create({username,email,password:hashedPassword})
    res.status(201).json({message:"Registred successfully!"})
}
catch(err){
    res.status(500).json({error:err.message})
}
}
//login
export const login=async (req,res)=>{
    try{
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(!userExist){
        return res.status(400).json({message:"user not found"})
    }
    const correctPassword= await bcrypt.compare(password,userExist.password)
    if(!correctPassword)
        return res.status(400).json({message:"wrong password"})
    //start creating the token
    const token=jwt.sign({id:userExist._id},"emangamal",{expiresIn:"1h"})
    res.status(200).json({message:"login successfully",token})

    
}
catch(err){
    res.status(500).json({erorr:err.message})
}

}
