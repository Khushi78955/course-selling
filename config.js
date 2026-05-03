require("dotenv").config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD


module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_USER_PASSWORD, 
    JWT_ADMIN_PASSWORD
};