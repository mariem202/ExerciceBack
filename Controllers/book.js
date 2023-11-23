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
  
  
 const create = async (req, res) => {
    try {
      // Créer une instance du livre avec les données de la requête
      const newLivre = new book(req.body);

      /*const newLivre = new livre({(req.body)
        Titre: req.body.Titre,
        Éditeur: req.body.Éditeur,
        Date_publication: req.body.Date_publication,
        Prix: req.body.Prix,
        Nombre_pages: req.body.Nombre_pages,
        Langue: req.body.Langue,
        Auteur: req.body.Auteur,
        Category: req.body.Category,
      });*/
  
      // Valider le livre avec mongoose
      await newLivre.validate();
  
      
      const authorId = req.body.author;
      const authors = await author.findById(authorId);
      const hasPreviousBooks = await book.countDocuments({ author: authorId }) > 0;
  
      if (authors && hasPreviousBooks) {
      
        const savedLivre = await newLivre.save();
        res.status(201).json(savedLivre);
      } else {
        res.status(400).json({ message: "L'auteur doit avoir écrit d'autres livres avant de créer celui-ci 🙂." });
      }
    } catch (error) {
      console.error("Erreur lors de la création du livre :", error.message);
      res.status(500).json({ error: error.message });
    }
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

const getTaskById = async (req, res) => {
  try {
    const authorId = req.params.id;

    // Use the findByAuthor static method
    const books = await book.findByAuthor(authorId);

    res.status(200).json({ books });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}



const countBooks = async () => {
  try {
    const bookCount = await book.countDocuments();
    console.log(`Nombre total de livres : ${bookCount}`);
  } catch (error) {
    console.error(error.message);
  }
};

const replaceBookByTitle = async () => {
  try {
    // Utiliser findOneAndReplace pour trouver et remplacer un document par son titre
    const replacedBook = await book.findOneAndReplace(
      { title: "Reseau Mobile" , /* autres critères ici si nécessaire */ },
      { title: "Mobile" },
      { new: true }
    );

    if (!replacedBook) {
      console.log('Livre "Reseau" non trouvé.');
      return;
    }

    console.log('Ancien livre :', replacedBook);
    console.log('Nouveau livre :', { title: "Mobile" });
  } catch (error) {
    console.error(error.message);
  }
};



const replaceBook = async (bookId, newBookId) => {
  try {
    // Utiliser findOneAndReplace pour trouver et remplacer un document par son ID
    const replacedBook = await book.findOneAndReplace({ _id: bookId }, { _id: newBookId }, { new: true });

    if (!replacedBook) {
      console.log('Livre non trouvé.');
      return;
    }

    console.log('Ancien livre :', replacedBook);
    console.log('Nouveau ID du livre :', newBookId);
  } catch (error) {
    console.error(error.message);
  }
};

// Exemple d'utilisation : remplacer l'ID du livre '5f862c88b8b05b2dd08f65a1' par un nouveau ID
const bookIdToUpdate = '652f056252056425a89146ca';
const newBookId = '654231a5bfa07f13bfd8d455'; // Remplacez par le nouvel ID que vous souhaitez utiliser

 //replaceBook(bookIdToUpdate, newBookId);

// Appeler la fonction pour effectuer la mise à jour
//replaceBookByTitle();

/*

const ajouter = async (req, res) => {
  try {
      const Book = new book(req.body);
      await Book.save();

      // Récupérer l'utilisateur correspondant à l'ID spécifié dans la requête
      const Author = await author.findById(req.body.author);

      // Ajouter l'ID de la chaise à la liste de chaises de l'utilisateur
      author.book.push(Book._id);

      // Enregistrer l'utilisateur mis à jour
      await author.save();

      res.status(201).json({
          message: "bien cree",
          model: Book
      });
  } catch (err) {
      res.status(400).json({
          error: err.message
      });
  }
};*/

const ajouter = async (req, res) => {
  try {
    const newBook = new book(req.body);
    await newBook.save();

    // Récupérer l'auteur correspondant à l'ID spécifié dans la requête
    const existingAuthor = await author.findById(req.body.author);

   

    // Ajouter l'ID du nouveau livre à la liste de livres de l'auteur
    existingAuthor.book.push(newBook._id);

    // Enregistrer l'auteur mis à jour
    await existingAuthor.save();

    res.status(201).json({
      message: "Bien créé",
      model: newBook
    });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};


const newList = []
console.log(newList)
const addBookAndGetList = (req, res) => {
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
          console.log('new List',this.newList)
          // Si l'auteur existe et les catégories sont valides, enregistrez le nouveau livre
          newBook
            .save()
            .then(() => {

               newList.push(newBook)
              console.log('new List',newList)
              res.status(200).json({
                model: this.newList,
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



//Ajouter et tableau : 
/*const addBookAndGetList = async (newBookData) => {
  try {
    // Ajouter un nouveau livre
    const newBook = new book(newBookData);
    await newBook.save();

    // Récupérer la nouvelle liste de livres
     newList =  newList.push(newBook)

    return newList;
  } catch (error) {
    console.error(error.message);
    throw error; // Vous pouvez choisir de gérer l'erreur différemment selon vos besoins
  }
};*/

// Exemple d'utilisation : ajouter un nouveau livre et obtenir la nouvelle liste


const t = []
const aaajouterr= (req, res)=>{

   
    const Vet = new book (req.body)
    Vet.save().then(()=>{
        t.push(Vet);
        res.status(201).json({
            model: Vet,
            
            message: "bien crée"
        })
        console.log(t)
    })
    .catch((err)=>{
        res.status(400).json({
        err: err.message,
        message: "non ajouter"
       })
    })
}

console.log(t)

// Liste statique
const staticList = [1, 2, 3, 4, 5];

// Fonction pour parcourir la liste
const parcourirListe = (liste) => {
  for (let i = 0; i < liste.length; i++) {
    console.log(liste[i]);
  }
};

// Appel de la fonction avec la liste statique
parcourirListe(staticList);


// Fonction de tri par une propriété numérique
const trierParNombre = (liste, propriete) => {
  liste.sort((a, b) => a[propriete] - b[propriete]);
};

const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);

module.exports={
    fetchById:fetchById,
    updateBook:updateBook,
    deleteBook:deleteBook,
    postBook:postBook,
    fetchBook:fetchBook,
    ajouter:ajouter,
    countBooks:countBooks,
    addBookAndGetList:addBookAndGetList,
    getTaskById:getTaskById,
    create:create
   // replaceBookByTitle:replaceBookByTitle
}


