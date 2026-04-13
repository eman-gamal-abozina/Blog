import mongoose from "mongoose"
import User from "./user.model.js"
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true},
    content:{
        type:String,
        required:true},
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User,
      required:true
    },
    date:{type:Date,
        default:Date.now}
})
const Post=mongoose.model("Post",PostSchema)
export default Post
