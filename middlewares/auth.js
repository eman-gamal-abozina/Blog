import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{
    //Q why chat tell me that we don't have to start try catch from the beginning
    try{
    const token=req.header('authorization')
    if(!token)
        return res.status(401).json({message:"Access Denied"})
    const verified=jwt.verify(token,'emangamal')
    req.user=verified
    next()
}
catch(err){
    res.status(400).json({error:err.message})
}


}