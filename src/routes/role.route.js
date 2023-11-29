const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');

router.get('/', roleController.list);
router.post('/create', roleController.create);
router.patch('/update/:_id', roleController.update);
router.delete('/delete/:_id', roleController.delete);

module.exports = router;