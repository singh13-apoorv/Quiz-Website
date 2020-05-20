var express = require('express')
var app = express()
var connection = require('./db')
var partR = require('./routes/participant');
var adminR = require('./routes/Admin');
var bodyParser = require('body-parser');
connection();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {        
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
     }
    return next();
});

app.get("/try",(req,res)=>{
    res.send("Hello")
})


app.use(bodyParser.json())
app.use(partR);
app.use(adminR);
app.listen(3000, () => {
    console.log("Connection Established");
})