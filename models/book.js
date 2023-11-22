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
});

bookSchema.statics.findByAuthor = function (authorId) {
    return this.find({ author: authorId });
};

module.exports = mongoose.model("Book",bookSchema)