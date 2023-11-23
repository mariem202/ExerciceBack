const event = require ("../models/event")
const postevent= (req,res)=> {
    const newev = new event (req.body)
    newCat.save().then(()=> {
            res.status(200).json({
                model: newev,
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
    postevent:postevent
   
}