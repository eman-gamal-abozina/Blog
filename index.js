import express from "express"
import "./config/connectDB.js"
import postsRoutes from "./routes/post.route.js"
import usersRoutes from "./routes/user.route.js"
const app=express()
const port=8000
app.use(express.json())
app.use('/posts',postsRoutes)
app.use('/users',usersRoutes)





app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})
//Q1 app=express() ===> router=express.router