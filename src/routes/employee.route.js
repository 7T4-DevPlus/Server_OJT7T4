const express = require('express');
const router = express.Router();

const controller = require('../controllers/employee.controller');

router.get('/', controller.list);
router.get('/details/:_id', controller.details);
router.post('/create', controller.create);
router.patch('/update/:_id', controller.update);
router.delete('/delete/:_id', controller.delete);

module.exports = router;