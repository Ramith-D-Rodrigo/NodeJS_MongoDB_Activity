const mongoose = require('mongoose');

let photoScheme = mongoose.Schema({
    file : File,
    caption : String
})