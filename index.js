import express from "express"
import "./config.js"
import Post from "./models/post.model.js"
import User from "./models/user.model.js"
const app=express()
const port=8000
app.use(express.json())

app.post('/add-post', async(req,res)=>{
    const {title,content}=req.body
    const newPost=await Post.create({title,content})
    res.status(201).json({message:"Post added successfully!"})

})
//look here
//************************************************************************************* */
app.get('/get-posts',async(req,res)=>{
    const {title}=req.query
    let query={}
    if(title)
        query.title={$regex:title,$options:'i'}

    const posts= await Post.find(query)
    res.status(200).json(posts)
})

//************************************************************************************* */
app.delete('/delete-post/:postID',async(req,res)=>{
    const{postID}=req.params
    const deletedPost=await Post.findByIdAndDelete(postID)
    if(!deletedPost)
        return res.status(404).json({message:"post not found"})
    res.status(200).json({message:"post deleted successfully!"})
})
app.patch('/update-post/:postID',async (req,res)=>{
    const {postID}=req.params
    const {title,content}=req.body
    const updatedPost=await Post.findByIdAndUpdate(postID,{title,content},{new:true})
    if(!updatedPost)
        return res.status(404).json({message:"post not found"})
    res.status(201).json({message:"post updated successfully",updatedPost})

})






















app.post('/register',async(req,res)=>{
    const{username,email,password}=req.body
    const UserExist=await User.findOne({email})
    if(UserExist){
        res.status(400).json({message:"Email already exist"})
        return
    }
    const newUser=await User({username,email,password})
    res.status(201).json({message:"Registred successfully!"})
    

})


app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})