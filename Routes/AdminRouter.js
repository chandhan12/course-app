const { signin, signup, profile, addCourse, getCourse, updateCourse, deleteCourse } =require("../controllers/admin.controller")

const express =require("express")
const { adminMiddleware } = require("../middlewares/adminMiddleware")




const AdminRouter=express.Router()

AdminRouter.post("/signup",signup)
AdminRouter.post("/signin",signin)
AdminRouter.get("/profile",adminMiddleware, profile)
AdminRouter.post("/course",adminMiddleware, addCourse)
AdminRouter.get("/course",adminMiddleware, getCourse)
AdminRouter.put("/course",adminMiddleware, updateCourse)
AdminRouter.delete("/course",adminMiddleware, deleteCourse)


module.exports={
    AdminRouter
}