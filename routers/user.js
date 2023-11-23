const express= require("express")
const router = express.Router()
const userController = require("../Controllers/user")
const auth=require("../middleware/auth")

// tasks est un variable bach n7ot fih liste

router.post("/signup",auth.validateSignup, userController.signup)
router.post("/login",userController.login)

module.exports = router