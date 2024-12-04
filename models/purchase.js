const mongoose=require("mongoose")

const purchaseSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

const Purchase=mongoose.model("Purchase",purchaseSchema)

module.exports={
    Purchase
}
