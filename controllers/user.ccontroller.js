const { User } = require("../models/userSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const signup=async (req,res) =>{
   try {
    const {email,password,location,age}=req.body


    const hashedPassword=await bcrypt.hash(password,10)
     await  User.create({
        email,
        password:hashedPassword,
        location,
        age
        
    })
    res.status(200).send({
        msg:"user created successfully"
    })

   } catch (error) {
    res.status(500).send({
        error:error.message
    })
    
   }
}

const signin=async (req,res)=>{
  try {
    const{email,password}=req.body

    const existingUser=await User.findOne({
        email
    })
    if(!existingUser){
        return res.status(403).send({
            error:"invalid email"
        })
    }

    const matchedPassword=bcrypt.compare(password,existingUser.password)

    if(!matchedPassword){
        return res.status(403).send({
            error:"invalid password"
        })
    }

    const token=jwt.sign({id:existingUser._id},process.env.SCERET_KEY)

    res.status(200).send({
        msg:"login successfully",
        token
    })

  } catch (error) {
    res.status(500).send({
        error:`something went wrong : ${error.message}`
    })
    
  }


}

module.exports={
    signup,
    signin
}