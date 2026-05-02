// const express = require("express");
// const Router = express.Router

const { Router } = require("express");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");


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
        res.status(500).json({
            message: "User already exists or error"
        })
    }
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "signup endpoint"
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