const express= require("express")
const router = express.Router()
const userController = require("../Controllers/user")
// tasks est un variable bach n7ot fih liste

router.post("/signup", userController.signup)
router.post("/login",userController.login)

module.exports = router