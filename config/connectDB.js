
import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/Blog")
.then(()=>
    console.log("Connected to MongoDB")

)
.catch((err)=>{
    console.log("ERror in Conneting",err)
})