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
    res.status(201).json({message:"Post added successfully!:)"})

})
//look here
//************************************************************************************* */
app.get('/get-posts',async(req,res)=>{
    const {title}=req.query
    const {category}=req.query
    let query={}
    if(title)
        query.title={$regex:title,$options:'i'}
    if(category)
        query.category=category

    const posts= await Post.find(query)
    res.status(200).json(posts)
})

//************************************************************************************* */
app.delete('/delete-post/:postID',async(req,res)=>{
    const{postID}=req.params
    const deletedPost=await Post.findByIdAndDelete(postID)
    if(!deletedPost)
        return res.status(404).json({message:"post not found"})
    res.status(200).json({message:"post deleted successfully!:)"})
})
//UPdate post
app.patch('/update-post/:postID',async (req,res)=>{
    const {postID}=req.params
    const {title,content}=req.body
    const updatedPost=await Post.findByIdAndUpdate(postID,{title,content},{new:true})
    if(!updatedPost)
        return res.status(404).json({message:"post not found:("})
    res.status(201).json({message:"post updated successfully",updatedPost})

})
//Add comment
app.patch('/add-comment/:postID',async(req,res)=>{
    const {postID}=req.params
    const{text,postedBy}=req.body
    const commentPost=await Post.findByIdAndUpdate(postID,{$push:{comment:{text,postedBy}}})
    if(!commentPost)
        return res.status(404).json({message:"post not found:("})
    res.status(201).json({commentPost})
})
//Delete comment
app.delete('/delete-comment/:postID/:commentID',async(req,res)=>{
    const{postID,commentID}=req.params
    const deletedComment= await Post.findByIdAndUpdate(postID,{$pull:{comment:{_id:commentID}}})
    //Have Q here
    if(!deletedComment)
        return res.status(404).json({message:"post or comment not found"})
    res.status(200).json({message:"comment deleted successfully:("})
})



app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})