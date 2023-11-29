const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Technical = require('./technical.model');

const Project = new Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: String,
    isActive: Boolean,
    createAt: {
        type: Date, 
        default: Date.now
    },
    technical: {
        type: Schema.Types.ObjectId, 
        ref: Technical
    },
})

module.exports = mongoose.model('Project', Project);