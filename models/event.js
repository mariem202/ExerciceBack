const mongoose = require("mongoose")
const eventSchema = mongoose.Schema ({
    title : {type :String , required: true},
    dateDeb :  {type : Date,required: true},
    dateDeb :  {type : Date,required: true}

});

module.exports = mongoose.model("Event",eventSchema)