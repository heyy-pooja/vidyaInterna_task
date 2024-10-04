const router = require("express").Router()
const userController = require("../controllers/user.controller")

router
    .post("/user-register", userController.registerUser)
    .post("/user-login", userController.loginUser)


module.exports = router

