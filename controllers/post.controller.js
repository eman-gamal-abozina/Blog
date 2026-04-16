import Post from "../models/post.model.js";
export const addPost =async(req,res)=>{
    try{
        const {title,content}=req.body
        const newPost=await Post.create({title,content})
        res.status(201).json({message:"Post added successfully"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

export const getPosts= async(req,res)=>{
    try{
    const {title}=req.query
    const {category}=req.query
    let query={}
    if(title)
        query.title={$regex:title,$options:'i'}
    if(category)
        query.category=category

    const posts= await Post.find(query)
    res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }

}

export const deletePost= async(req,res)=>{
    try{
    const{postID}=req.params
    const deletedPost=await Post.findByIdAndDelete(postID)
    if(!deletedPost)
        return res.status(404).json({message:"post not found"})
    res.status(200).json({message:"post deleted successfully!:)"})
}
catch(err){
    res.status(500).json({error:err.message})
}
}

export const updatePost=async (req,res)=>{
    try{
    const {postID}=req.params
    const {title,content}=req.body
    const updatedPost=await Post.findByIdAndUpdate(postID,{title,content},{new:true})
    if(!updatedPost)
        return res.status(404).json({message:"post not found:("})
    res.status(201).json({message:"post updated successfully",updatedPost})
}
catch(err){
    res.status(500).json({error:err.message})
}
}

export const addComment=async(req,res)=>{
    try{
    const {postID}=req.params
    const{text,postedBy}=req.body
    const commentPost=await Post.findByIdAndUpdate(postID,{$push:{comment:{text,postedBy}}})
    if(!commentPost)
        return res.status(404).json({message:"post not found:("})
    res.status(201).json({commentPost})
}
catch(err){
    res.status(500).json({error:err.message})
}
}




export const deleteComment=async(req,res)=>{
    try{
    const{postID,commentID}=req.params
    const deletedComment= await Post.findByIdAndUpdate(postID,{$pull:{comment:{_id:commentID}}})
    if(!deletedComment)
        return res.status(404).json({message:"post or comment not found"})
    res.status(200).json({message:"comment deleted successfully:("})
}
catch(err){
    res.status(500).json({error:err.message})
}
}

