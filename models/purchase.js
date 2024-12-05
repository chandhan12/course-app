const mongoose=require("mongoose")
const { Course } = require("./courseSchema")
const { User } = require("./userSchema")

const purchaseSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:Course
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User,
        required:true
    }
})

const Purchase=mongoose.model("Purchase",purchaseSchema)

module.exports={
    Purchase
}
