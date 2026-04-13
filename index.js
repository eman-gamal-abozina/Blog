import express from "express"
import "./config.js"
import Post from "./models/post.model.js"
import User from "./models/user.model.js"
const app=express()
const port=8000
app.use(express.json())


app.post('/register',async(req,res)=>{
    const{name,email,password}=req.body
    const UserExist=await User.findOne({email})
    if(UserExist){
        res.status(400).json({message:"Email already exist"})
    }
    else{
        const newUser=new User({name,email,password})
        await newUser.save()
        res.status(201).json({message:"Registred successfully!"})
    }

})







app.post('/posts', async(req,res)=>{
    const {title,content,author}=req.body
    const newPost=new Post({title,content,author})
    const savedPost=  await newPost.save()
    res.status(201).json({message:"Post added successfully!"})

})



app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})