const mongoose = require("mongoose")
const AuthorSchema = mongoose.Schema ({
    lastName : {type :String , required: true},
    firstName : {type: String, required : true},
    nationality :  {type : String,required: false},
    books : [{type:mongoose.Schema.Types.ObjectId,ref: "Book",
    required: true }]
})

module.exports = mongoose.model("Author",AuthorSchema)