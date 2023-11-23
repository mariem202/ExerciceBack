const express= require("express")
//mouch bch njib exxpress ka fonction kemla 7achty ken b router 
const router = express.Router()
const CatController = require ("../Controllers/event")
const auth=require("../middleware/auth")


router.post("/add", auth.validateSignup,CatController.postevent)
module.exports = router