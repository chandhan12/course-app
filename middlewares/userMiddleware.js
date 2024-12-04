const jwt = require("jsonwebtoken")


const authMiddleware=(req,res,next)=>{
    try {
        const {token}=req.headers

    const decodedUser=jwt.verify(token ,process.env.SCERET_KEY)

    if(!decodedUser){
        return res.status(401).send({
            msg:"token invalid"
        })
    }
    req.userId=decodedUser.id
    next()


    } catch (error) {
        res.status(500).send({
            error:error.message
        })
        
    }

}

module.exports={
    authMiddleware
}