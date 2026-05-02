const express = require("express");
const app = express();

app.post("/user/signup", function(req, res){
    req.json({
        message: "signup endpoint"
    })
})

app.post("/user/signup", function(req, res){
    req.json({
        message: "signup endpoint"
    })
})

app.get("/user/purchases", function(req, res){
    req.json({
        message: "signup endpoint"
    })
})

app.post("/course/purchase", function(req, res){
    req.json({
        message: "signup endpoint"
    })
})

app.get("/courses", function(req, res){
    req.json({
        message: "signup endpoint"
    })
})

app.listen(3000);