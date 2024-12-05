const { User } = require("../models/userSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { Course } = require("../models/courseSchema")
const { Purchase } = require("../models/purchase")


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

    const matchedPassword=await bcrypt.compare(password,existingUser.password)

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

const profile=async (req,res) =>{
   try {
    const userId=req.userId


    const profileData=await User.findById({
        _id:userId
    })

    if(profileData){
        res.status(200).send({
            yourProfileData:profileData
        })
    }

    
   } catch (error) {
    res.send({
        error:error.message
    })
   }

}

const getCourse=async (req,res) =>{
 try {
       
  const courses= await  Course.find()

  res.status(200).send({
    courses
  })

 } catch (error) {
    res.status(500).send({
        error:error.message
    })
 }
}

const buyCourse= async  (req,res)=>{
   try {
    const {courseId}=req.body
    const userId= req.userId

   const existCourse=await  Purchase.findOne({
        courseId:courseId,
        userId:userId
    })
    if(existCourse){
        return res.send({
           msg: "course is already purchased"
        })
    }

    await Purchase.create({
        courseId:courseId,
        userId:userId
    })

    res.status(200).send({
        msg:"course puchased successfully"
    })
   } catch (error) {
    res.status(500).send({
        error:error.message
    })
   }
}
const getPurchases=async(req,res)=>{
   try {
    const userId=req.userId

    const purchases= await Purchase.find({
          userId:userId
      }).populate("courseId","title description")
  
  
      res.send({
          purchases
      })
   } catch (error) {
    res.status(500).send({
        error:error.message
    })
   }
}

module.exports={
    signup,
    signin,
    profile,
    getCourse,
    buyCourse,
    getPurchases
}