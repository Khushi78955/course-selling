const { Router } = require("express");
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_PASSWORD

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
    }, JWT_ADMIN_SECRET);

    res.json({
        message: "Signin successful",
        token: token
    })
})



adminRouter.post("/course", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/course", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    adminRouter: adminRouter
}
