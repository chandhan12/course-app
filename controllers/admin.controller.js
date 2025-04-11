
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { Admin } = require("../models/adminSchema")
const { Course } = require("../models/courseSchema")


const signup=async (req,res) =>{
   try {
    const {email,password,location,age}=req.body


    const hashedPassword=await bcrypt.hash(password,10)
     await  Admin.create({
        email,
        password:hashedPassword,
        location,
        age
        
    })
    res.status(200).send({
        msg:"admin created successfully"
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

    const existingAdmin=await Admin.findOne({
        email
    })
    if(!existingAdmin){
        return res.status(403).send({
            error:"invalid email"
        })
    }

    const matchedPassword=bcrypt.compare(password,existingAdmin.password)

    if(!matchedPassword){
        return res.status(403).send({
            error:"invalid password"
        })
    }

    const token=jwt.sign({id:existingAdmin._id},process.env.SCERET_KEY)

    res.status(200).send({
        msg:"admin login successfully",
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
     const adminId=req.adminId
 
 
     const profileData=await Admin.findById({
         _id:adminId
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


const addCourse=async (req,res)=>{
  try {
    const {title,description,price,imgUrl}=req.body
    const adminId=req.adminId

    await Course.create({
        title,
        description,
        price,
        imgUrl, 
        creatorId:adminId
    })

    res.status(200).send({
        msg:"course created successfully"
    })

  } catch (error) {
    
    res.status(500).send({
        error:error.message
    })
  }
}

const getCourse =async (req,res) =>{
   try {
    const adminId=req.adminId

    const courses= await Course.find({
         creatorId:adminId
     })
     res.status(200).send({
         courses
     })
 
   } catch (error) {
    res.status(500).send({
        error:error.message
    })
    
   }
}

const updateCourse=async(req,res)=>{
  try {
    const adminId=req.adminId
    const {courseId,price,title}=req.body
    

    await Course.findOneAndUpdate({
        _id:courseId,
        creatorId:adminId
    },{
        price,
        title
    })

    res.status(200).send({
        msg:"course updated successfully"
    })
  } catch (error) {
    res.status(500).send({
        error:error.message
    })
    
  }
}

const deleteCourse =async (req,res) =>{
   try {
    const {courseId}=req.body
    const adminId=req.adminId

    const response=await Course.findOneAndDelete({
        _id:courseId,
        creatorId:adminId
    })
    console.log(response)

    if(!response){
        return res.send({
            msg:"something went wrong"
        })
    }

    res.send({
        msg:"coures deleted successfully"
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
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
}