const mongoose = require("mongoose")
const AuthorSchema = mongoose.Schema ({
    lastName : {type :String , required: true},
    firstName : {type: String, required : true},
    nationality :  {type : String,required: false},
    books : [{type:mongoose.Schema.Types.ObjectId,ref: "Book",
    required: false }]
})
/*
AuthorSchema.methods.hasWrittenBooks = async function () {
    const authorId = this._id;
    const bookCount = await mongoose.model('books').countDocuments({ author: authorId });
    return bookCount > 0;
  };*/ 
module.exports = mongoose.model("Author",AuthorSchema)