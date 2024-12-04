const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
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

const User=mongoose.model("User",userSchema)


module.exports={
    User
}