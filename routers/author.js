const express= require("express")
//mouch bch njib exxpress ka fonction kemla 7achty ken b router 
const router = express.Router()
const authorController = require ("../Controllers/author")

router.post("/add", authorController.postAuthor)
module.exports = router