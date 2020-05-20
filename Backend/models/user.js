var mongoose = require("mongoose");
var Schema = mongoose.Schema

var userData = new Schema({
    name:{
        required:true,
        type:String,
    },
    regno:{
        required:true,
        type:String,
    },
    class:{
        required:true,
        type:String,
    },
    branch:{
        required:true,
        type:String,
    }
})

var Student = mongoose.model('user',userData);

module.exports = Student;