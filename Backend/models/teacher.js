var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    eid:{
        type:Number,
        required:true,
    }
})

var teacherData = mongoose.model('teacher',teacherSchema);

module.exports = teacherData;