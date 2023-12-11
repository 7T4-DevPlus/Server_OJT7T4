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
    }
})

module.exports = mongoose.model('Record', Record);