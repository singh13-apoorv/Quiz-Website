var express = require('express');
var router = express.Router();
var Student = require('../models/user');
var Ques = require('../models/questions');
var ResData = require('../models/response');
var Evaluation = require('../models/eval');
router.get('/questions', (req, res) => {
    Ques.find()
        .then((data) => {
            res.send(data);
        })
})
router.post('/submitresponse', (req, res) => {
    var x = new ResData({
        ques: req.body.ques,
        ans: req.body.ans,
        regno: req.body.regno,
    })
    Student.find({ regno: req.body.regno })
        .then((data1) => {
            if (data1.length != 0) {
                x.save()
                    .then(() => {
                        res.send(true);
                    })
            }
            else {
                res.send(false);
            }
        })
})
router.post('/newstudent', (req, res) => {
    var x = new Student({
        name: req.body.name,
        regno: req.body.regno,
        class: req.body.class,
        branch: req.body.branch,
    })
    Student.find({ regno: req.body.regno })
        .then((data) => {
            if (data.length != 0) {
                res.send(false);
            }
            else {
                x.save()
                    .then(() => {
                        res.send(true)
                    })
                    .catch(()=>{
                        res.send(false)
                    })
            }
        })

})
router.get('/getevals',(req,res)=>{
    Evaluation.find()
    .then((data)=>{
        res.send(data);
    })
})
router
module.exports = router;