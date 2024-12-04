const mongoose=require("mongoose")


const courseSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    creatorId:{
        type:mongoose.Types.ObjectId,
        ref:"Admin"
    }
})

const Course=mongoose.model("Course",courseSchema)

module.exports={
    Course
}