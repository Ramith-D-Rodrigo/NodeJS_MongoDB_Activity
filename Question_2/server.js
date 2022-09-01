const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost/rad_activity");

app.get('/', function(req, res){
    res.render('index.ejs');
})

app.post('/upload', function(req, res){

})

app.listen(3000);