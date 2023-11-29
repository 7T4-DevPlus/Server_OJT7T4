const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Technical = new Schema({
    name: String
})

module.exports = mongoose.model('Technical', Technical);