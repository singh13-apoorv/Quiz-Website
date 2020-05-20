var mongoose = require('mongoose');
var Schema = mongoose.Schema
var questionSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    question: {
        required: true,
        type: String,
    },
    level: {
        required: true,
        type: Number,
    }
})

var Ques = mongoose.model("questions", questionSchema);

module.exports = Ques;