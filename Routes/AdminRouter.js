const { signin, signup } =require("../controllers/admin.controller")

const express =require("express")



const AdminRouter=express.Router()

AdminRouter.post("/signup",signup)
AdminRouter.post("/signin",signin)

module.exports={
    AdminRouter
}