const Record = require('../models/record.model');

class RecordController {
    async list(req, res) {
        try {
            const records = await Record.find({});
            res.json({ success: true, records })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = new RecordController;