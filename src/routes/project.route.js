const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

const controller = require('../controllers/project.controller');
const employeeProjectController = require('../controllers/employeeProject.controller');

router.get('/', controller.list);
router.get('/:_id', controller.details);
router.post('/create', upload.none(), controller.create);
router.patch('/update/:_id', upload.none(), controller.update);
router.patch('/close/:_id', controller.close);

router.get('/getEmployees/:_id', employeeProjectController.getEmployeeInProject);
router.post('/addemp', upload.none(), employeeProjectController.addEmployee);
router.patch('/removeemp/:_id', employeeProjectController.removeEmployee);

module.exports = router;