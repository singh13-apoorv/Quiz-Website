var express = require('express')
var Ques = require('../models/questions');
var teacherData = require('../models/teacher');
var router = express.Router();
var mongoose = require("mongoose");
var Student = require('../models/user');
var ResData = require('../models/response');
var Evaluation = require('../models/eval');
router.post("/newques", (req, res) => {
    var x =new Ques({
        name:req.body.name,
        question:req.body.question,
        level:req.body.level
    })
    x.save().then(()=>{
        res.send(true);
    }).catch((err)=>{
        res.send(false);
    })
})
router.post("/newteacher",(req,res)=>{
    var newTeacher = new teacherData({
        name:req.body.name,
        gender:req.body.gender,
        eid:req.body.eid,
    })
    newTeacher.save()
    .then(()=>{
        res.send(true);
    })
    .catch(()=>{
        res.send(false);
    })
})
router.get("/teacherData",(req,res)=>{
    teacherData.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.send(err);
    })
})
router.get("/studentlist",(req,res)=>{
    Student.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/getresponse/:reg",(req,res)=>{
    ResData.find({regno:req.params.reg})
    .then((data)=>{
        res.send(data);
    })
    .catch(()=>{
        res.send(false);
    })
})

router.post("/eval",(req,res)=>{
    console.log(req.body);
    var x = new Evaluation({
        ques:req.body.ques,
        ans:req.body.ans,
        regno:req.body.regno,
        marks:req.body.marks
    })
    x.save().then(()=>{
        res.send(true);
    })
    .catch(()=>{
        res.send(false);
    })
})
module.exports = router;