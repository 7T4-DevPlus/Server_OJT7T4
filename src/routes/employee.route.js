const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

const controller = require('../controllers/employee.controller');
const employeeProjectController = require('../controllers/employeeProject.controller');

router.get('/', controller.list);
router.get('/:_id', controller.details);
router.post('/create', upload.single("image"), controller.create);
router.patch('/update/:_id', upload.single("image"), controller.update);
router.patch('/delete/:_id', controller.delete);

router.get('/history/:_id', employeeProjectController.getEmployeeHistory);

module.exports = router;