const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Record = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    record: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "default"
    },
    object: {
        type: String
    }
})

module.exports = mongoose.model('Record', Record);