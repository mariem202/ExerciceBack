const book = require ("../models/book")

const author = require ("../models/author")
const category = require ("../models/category")

const fetchBook =(req,res)=> {
    // Utilisation de la méthode "find" pour rechercher des tâches dans une source de données
    book.find()
    .populate('author categories')
    .exec()
    // Si la recherche est réussie, retournez les tâches trouvées en tant que réponse JSON
    .then((books)=>{
        res.status(200).json({
            model : books,
            message :"success"
        });
    }
    )
    // En cas d'erreur, renvoyez une réponse d'erreur avec le message d'erreur
    .catch ((error) => {
        res.status(404).json({
            error : error.message,
            message: "pas de données "
        });
    });
}

/*
const postBook = (req,res)=> {
   const newbook = new book (req.body)

   author.findOne({_id:req.body.author})
   .then((OneAuthor) => {
    if(!OneAuthor){
        res.status(404).json({
            message: "objet non trouvé",})
            return}
            newbook.save().then(()=> {
                res.status(200).json({
                    model: newbook,
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

   
   })





   
}
*/

/*const postBook = (req, res) => {
    const newBook = new book(req.body);
  
    // Vérifie si l'auteur avec l'ID donné existe
    author.findOne({ _id: req.body.author })
      .then((foundAuthor) => {
        if (!foundAuthor) {
          return res.status(404).json({
            message: "Auteur non trouvé",
          });
        }
  
        // Si l'auteur existe, enregistrez le nouveau livre
        newBook
          .save()
          .then(() => {
            res.status(200).json({
              model: newBook,
              message: "Livre créé avec succès",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: error.message,
              message: "Problème lors de l'ajout du livre",
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
          message: "Erreur lors de la recherche de l'auteur",
        });
      });
  };*/


  const postBook = (req, res) => {
    const newBook = new book(req.body);
    const authorId = req.body.author;
    const categoryIds = req.body.categories;
  
    // Vérifie si l'auteur avec l'ID donné existe
    author.findOne({ _id: authorId })
      .then((foundAuthor) => {
        if (!foundAuthor) {
          return res.status(404).json({
            message: "Auteur non trouvé",
          });
        }
  
        // Vérifie la validité des IDs de catégories
        category.find({ _id: { $in: categoryIds } })
          .then((foundCategories) => {
            if (foundCategories.length !== categoryIds.length) {
              return res.status(400).json({
                message: "IDs de catégories non valides",
              });
            }
  
            // Si l'auteur existe et les catégories sont valides, enregistrez le nouveau livre
            newBook
              .save()
              .then(() => {
                res.status(200).json({
                  model: newBook,
                  message: "Livre créé avec succès",
                });
              })
              .catch((error) => {
                res.status(400).json({
                  error: error.message,
                  message: "Problème lors de l'ajout du livre",
                });
              });
          })
          .catch((error) => {
            res.status(500).json({
              error: error.message,
              message: "Erreur lors de la recherche des catégories",
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
          message: "Erreur lors de la recherche de l'auteur",
        });
      });
  };
  
  
const deleteBook =(req,res) => {
    book.deleteOne({_id : req.params.id}).then (()=> {
        res.status(200).json({
            message : "suppremé avec succes"
        });
    })
    .catch((error) => {
        res.status(400).json({
        error:error.message,
        message : "erreur de suppression"
    })
    })
    
}
const updateBook = (req,res) =>{
    book.findOneAndUpdate({_id:req.body.id}, req.body,{new:true})
    .then((Book)=> {
        if(!Book){res.status(404).json({
            message: "Object non trouvé",
        })
    return
    }
    res.status(200).json({
        model: book,
        message: "object modifié",
    })

    })
    .catch((error)=> {
        res.status(400).json({
            message :"données invalide"
        })
    })
}

const fetchById =(req,res)=> {
   book.findOne({_id:res.body.id})
   .then((OneBook) => {
    if(!OneBook){
        res.status(404).json({
            message: "objet non trouvé",})
            return}  
    res.status(200).json({
        model:OneBook,
        message:"object trouvé"
    });
   })
   
}

module.exports={
    fetchById:fetchById,
    updateBook:updateBook,
    deleteBook:deleteBook,
    postBook:postBook,
    fetchBook:fetchBook
}


