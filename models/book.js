const mongoose = require("mongoose")
const bookSchema = mongoose.Schema ({
    title : {type :String , required: true},
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    publicationYear :  {type : Number,required: false}
})

module.exports = mongoose.model("Book",bookSchema)