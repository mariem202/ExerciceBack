const mongoose = require("mongoose")
const userSchema = mongoose.Schema ({
    email : {type :String , required: true,unique:true},
    password : {type: String, required : true},
    LastName : {type: String, required : true},
    firstName : {type: String, required : true},
    role : {type: String,enum :["admin","user"] , required : true},
},{ timestamps: true },
 { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })


// Adding a virtual field "name"
userSchema.virtual("name").get(function () {
    return this.firstName + " " + this.LastName;
});

// Ajoutez une méthode toPublic au schéma
userSchema.methods.toPublic = function () {
    const userObject = this.toObject(); // Convertit le document Mongoose en objet JavaScript

    // Supprime le champ du mot de passe
    delete userObject.password;

    // Ajoute le champ "name"
    userObject.name = this.firstName + " " + this.LastName;

    return userObject;
};

module.exports = mongoose.model("Reader",userSchema)