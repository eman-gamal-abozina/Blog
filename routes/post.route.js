import express from "express";
import { addComment, addPost, deleteComment, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router=express.Router()
router.post('/',verifyToken,addPost)
router.get('/',getPosts)
router.delete('/:postID',deletePost)
router.patch('/:postID',updatePost)
router.post('/comments/:postID',addComment)
router.delete('/comments/:postID/:commentID',deleteComment)
export default router