const mongoose = require("mongoose")
const AuthorSchema = mongoose.Schema ({
    lastName : {type :String , required: true},
    firstName : {type: String, required : true},
    nationality :  {type : String,required: false}
})

module.exports = mongoose.model("Author",AuthorSchema)