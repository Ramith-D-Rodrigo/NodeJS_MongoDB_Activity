const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
    image:{
        data : Buffer,
        contentType : String
    },
    caption : String
});

module.exports = mongoose.model("Image", imageSchema);