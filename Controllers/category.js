const category = require ("../models/category")


const postcategory = (req,res)=> {
    const newCat = new category (req.body)
    newCat.save().then(()=> {
            res.status(200).json({
                model: newCat,
                message: "object crée "
                })
             })
             .catch((error)=> {
             res.status(400).json({
                 error:error.message,
                 message : "probleme d'ajout "
             })
             }
             )  
 
            } 

            module.exports={
                postcategory:postcategory
               
            }