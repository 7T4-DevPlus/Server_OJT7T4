const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Technical = require('./technical.model');

const Employee = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    identity: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    isAvailable:{
        type: Boolean, 
        default: true
    },
    isManager: {
        type: Boolean, 
        default: false
    },
    isDelete: {
        type: Boolean, 
        default: false
    },
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