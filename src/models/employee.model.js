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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dfz0xsh2d/image/upload/v1701956118/zdrwpmaiuojwpkzmaei5.png"
    },
    identity: {
        type: String,
        required: true
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
    technical: [
        {
            technicalId: {
                type: Schema.Types.ObjectId,
                ref: Technical
            },
            point: {
                type: Number,
                default: 0
            }
        }
    ],
})

Employee.pre('findOne', function (next) {
    this.populate('technical.technicalId', 'name');
    next();
});

module.exports = mongoose.model('Employee', Employee);