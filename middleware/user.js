const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = process.env.JWT_USER_PASSWORD;

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, )

}

module.exports = {
    userMiddleware
}