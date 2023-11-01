const mongoose = require("mongoose")
const CatSchema = mongoose.Schema ({
   
    title : {type: String,enum :["Horror","Mystery", "Romance"] , required : true},
})

module.exports = mongoose.model("Category",CatSchema)