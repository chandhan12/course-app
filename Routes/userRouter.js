const express =require("express")
const { signup, signin, profile } = require("../controllers/user.ccontroller")
const { authMiddleware } = require("../middlewares/userMiddleware")


const UserRouter=express.Router()

UserRouter.post("/signup",signup)
UserRouter.get("/profile",authMiddleware,profile)
UserRouter.post("/signin",signin)

module.exports={
    UserRouter
}