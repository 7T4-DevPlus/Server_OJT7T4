const express = require('express');
const router = express.Router();

const techController = require('../controllers/technical.controller');

router.get('/', techController.list);
router.post('/create', techController.create);
router.patch('/update/:_id', techController.update);
router.delete('/delete/:_id', techController.delete);

module.exports = router;