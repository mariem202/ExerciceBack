const jwt = require("jsonwebtoken")
const Joi = require('joi');
const User = require("../models/user")
module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const userId = decodedToken.userId
    console.log("ecrire userId",userId)
     //find user with userId if exist 
  //recuperer le role 
  User.findOne({ _id: userId})
  .then((user) =>{//user li entre () howa reponse li bch targa3li 
      if(!user) {
        req.auth = {
          userId: userId,
          role: user.role //role from findOne

        }
        console.log(user)
        next()
      }
      else {
        res.status(401).json({error:"user n'existe pas"})
      }
   
  })

  } catch (error) {
    res.status(401).json({ error : error.message })
  }
}

module.exports.isAdmin=(req, res, next) => {
 
  //403 car il est connecte deja sinon 401
  try{
    if(req.auth.role=="admin"){
      next()
    }
    else {
      res.status(403).json({error: "no access to this route"})
    }
  }
  catch(e)
  {
    res.status(403).json({error :error.message})
  }

}


// Middleware de validation avec Joi

module.exports. validateSignup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    LastName: Joi.string().required(),
    firstName: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Passez à la prochaine étape du traitement
};
