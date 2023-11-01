const mongoose = require("mongoose")
const userSchema = mongoose.Schema ({
    email : {type :String , required: true,unique:true},
    password : {type: String, required : true},
    LastName : {type: String, required : true},
    firstName : {type: String, required : true},
    role : {type: String,enum :["admin","user"] , required : true},
})

module.exports = mongoose.model("Reader",userSchema)