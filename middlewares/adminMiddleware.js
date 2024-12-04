const jwt = require("jsonwebtoken")


const adminMiddleware=(req,res,next)=>{
    try {
        const {token}=req.headers

    const decodedAdmin=jwt.verify(token ,process.env.SCERET_KEY)

    if(!decodedAdmin){
        return res.status(401).send({
            msg:"token invalid"
        })
    }
    req.adminId=decodedAdmin.id
    next()


    } catch (error) {
        res.status(500).send({
            error:error.message
        })
        
    }

}

module.exports={
    adminMiddleware
}