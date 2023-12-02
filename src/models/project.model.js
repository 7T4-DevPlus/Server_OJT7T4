const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Technical = require('./technical.model');

const Project = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    status: String,
    isActive: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model('Project', Project);