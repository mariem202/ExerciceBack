const author = require ("../models/author")


const postAuthor = (req,res)=> {
    const newAuth = new author (req.body)
    newAuth.save().then(()=> {
            res.status(200).json({
                model: newAuth,
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
                postAuthor:postAuthor
               
            }