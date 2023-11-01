const express= require("express")
//mouch bch njib exxpress ka fonction kemla 7achty ken b router 
const router = express.Router()

const bookController = require("../Controllers/book")
// tasks est un variable bach n7ot fih liste

const auth=require("../middleware/auth")


router.get("/",bookController.fetchBook)
router.get("/:id",auth.loggedMiddleware,bookController.fetchBook)
router.post("/AddBook",bookController.postBook)
router.patch("/UpdateBook/:id",auth.loggedMiddleware,bookController.updateBook)
router.delete("/DeleteBook/:id",auth.loggedMiddleware,bookController.deleteBook)

module.exports=router