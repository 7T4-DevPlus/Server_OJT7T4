const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Technical = require('./technical.model');

const Employee = new Schema({
    name: String,
    code: String,
    phone: String,
    email: String,
    image: String,
    identity: String,
    gender: String,
    isAvailable: Boolean,
    isManager: Boolean,
    isDelete: Boolean,
    createAt: {
        type: Date, 
        default: Date.now
    },
    technical: [{
        type: Schema.Types.ObjectId, 
        ref: Technical
    }],
})

module.exports = mongoose.model('Employee', Employee);