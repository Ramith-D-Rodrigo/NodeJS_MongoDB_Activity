const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const Image = require('./models/photo');

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));



mongoose.connect("mongodb://localhost/rad_activity");

app.get('/', function(req, res){
    res.render('index.ejs');
})

app.post('/upload', upload.single('photo'), function(req, res){
    const img_data = {
        data: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const caption = req.body.caption;
     
    const final_img = {image: img_data, caption: caption};
    console.log(final_img);
    Image.create(final_img, function(err, image){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    })
});

app.listen(3000);