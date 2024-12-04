const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const { UserRouter } = require("./Routes/userRouter");
const {AdminRouter}=require("./Routes/AdminRouter")

const app=express();
app.use(express.json())

app.use("/api/user",UserRouter)

app.use("/api/admin",AdminRouter)



dotenv.config()

async function main(){
   try {
    await mongoose.connect(process.env.MONGODB_URL)
    
    console.log("connected to DB")
   } catch (error) {
    console.log(error.message)
    
   }
}


main();


app.get("/",(req,res)=>{
    res.send({
        msg:"it is working"
    })
})

app.listen(3000,()=>{
    console.log("server is started...")
})