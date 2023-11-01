const express= require("express")
//mouch bch njib exxpress ka fonction kemla 7achty ken b router 
const router = express.Router()
const CatController = require ("../Controllers/category")

router.post("/add", CatController.postcategory)
module.exports = router