var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Response = new Schema({
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
})

var ResData = mongoose.model("response",Response);
module.exports = ResData;