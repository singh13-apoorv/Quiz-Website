var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var evals = new Schema({
    ques: {
        type: String,
        required: true,
    },
    ans: {
        type: String,
        required: true,
    },
    regno: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
})
var Evaluation = mongoose.model("eval",evals);
module.exports = Evaluation;