const express = require('express');
const router = express.Router();

const controller = require('../controllers/project.controller');

router.get('/', controller.list);
router.get('/:_id', controller.details);
router.post('/create', controller.create);
router.patch('/update/:_id', controller.update);
router.patch('/close/:_id', controller.close);

module.exports = router;