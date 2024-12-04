const mongoose=require("mongoose")


const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        require:true
    }
})

const Admin=mongoose.model("Admin",adminSchema)


module.exports={
    Admin
}