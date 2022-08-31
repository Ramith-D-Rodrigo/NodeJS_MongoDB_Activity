
const mongoose = require('mongoose');
const User = require('./models/user.js');

mongoose.connect("mongodb://localhost/rad_activity");



module.exports = initialize;