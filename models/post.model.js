import mongoose from "mongoose"
import User from "./user.model.js"
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:"general"
    },
    comment:[{
        text:{type:String},
        postedBy:{type:String},
        createdAt:{type:Date,default:Date.now}
    }],
    createAt:{
        type:Date ,
        default:Date.now
    }
})
const Post=mongoose.model("Post",PostSchema)
export default Post
