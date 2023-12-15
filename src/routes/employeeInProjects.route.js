const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

const employeeProjectController = require('../controllers/employeeProject.controller');

router.get('/', employeeProjectController.list);
router.get('/getEmployees/:_id', employeeProjectController.getEmployeeInProject);
router.post('/addemp', upload.none(), employeeProjectController.addEmployee);
router.patch('/removeemp/:_id', employeeProjectController.removeEmployee);

module.exports = router;