const express =require("express")
const { signup, signin, profile, getCourse, buyCourse, getPurchases } = require("../controllers/user.ccontroller")
const { authMiddleware } = require("../middlewares/userMiddleware")


const UserRouter=express.Router()

UserRouter.post("/signup",signup)
UserRouter.get("/profile",authMiddleware,profile)
UserRouter.post("/signin",signin)
UserRouter.get("/course",getCourse)
UserRouter.post("/purchase",authMiddleware,buyCourse)
UserRouter.get("/purchases",authMiddleware,getPurchases)


module.exports={
    UserRouter
}