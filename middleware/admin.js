const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next){
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    req.adminId = decoded.id;
    next();
}
module.exports = {
    adminMiddleware: adminMiddleware
}