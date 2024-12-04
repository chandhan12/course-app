const { signin, signup, profile } =require("../controllers/admin.controller")

const express =require("express")
const { adminMiddleware } = require("../middlewares/adminMiddleware")




const AdminRouter=express.Router()

AdminRouter.post("/signup",signup)
AdminRouter.post("/signin",signin)
AdminRouter.get("/profile",adminMiddleware, profile)


module.exports={
    AdminRouter
}