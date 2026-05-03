// const express = require("express");
// const Router = express.Router

const { Router } = require("express");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");


const userRouter = Router();

userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
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
            message: "User already exists or error"
        })
    }
})

userRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;
    
    const user = await userModel.findOne({
        email
    })

    if(!user) {
        return res.status(403).json({
            message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(403).json({
            message: "Incorrect password"
        });
    }

    const token = jwt.sign({
        id: user._id
    }, JWT_USER_PASSWORD);

    res.json({
        message: "Signin successful",
        token: token
    })
})


userRouter.get("/purchases", function(req, res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}