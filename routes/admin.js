const { Router } = require("express");
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const { courseModel } = require("../db");

const adminRouter = Router()

adminRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        res.json({
            message: "Signup succeeded"
        })
    } catch(e){
        console.error(e);
        res.status(500).json({
            message: "admin already exists or error"
        })
    }

})



adminRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;
    
    const admin = await adminModel.findOne({
        email
    })

    if(!admin) {
        return res.status(403).json({
            message: "admin not found"
        })
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        return res.status(403).json({
            message: "Incorrect password"
        });
    }

    const token = jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD);

    res.json({
        message: "Signin successful",
        token: token
    })

})



adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.adminId;

    const {title, description, imageUrl, price} = req.body;

    const course =await courseModel.create({
        title, 
        description, 
        imageUrl, 
        price, 
        creatorId : adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })

})



adminRouter.put("/course", adminMiddleware, async function(req, res){
    const adminId = req.adminId;

    const {title, description, imageUrl, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title, 
        description, 
        imageUrl, 
        price
    })

    if (result.matchedCount === 0) {
        return res.status(403).json({
            message: "Not allowed to update this course"
        });
    }

    res.json({
        message: "Course updated",
        courseId: course._id
    })

})



adminRouter.get("/course/bulk", adminMiddleware, async function(req, res){
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Course updated",
        courses
    })
    
})


module.exports = {
    adminRouter: adminRouter
}
