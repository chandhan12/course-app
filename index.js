const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")


const app=express();
app.use(express.json())

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