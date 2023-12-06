const express = require('express');
const router = express.Router();

const controller = require('../controllers/project.controller');
const employeeProjectController = require('../controllers/employeeProject.controller');

router.get('/', controller.list);
router.get('/:_id', controller.details);
router.post('/create', controller.create);
router.patch('/update/:_id', controller.update);
router.patch('/close/:_id', controller.close);

// router.get('/getEmployees/:_id', controller.getEmployeeInProject);
// router.post('/addemp', controller.addEmployee);
// router.patch('/removeemp/:_id', controller.removeEmployee);

router.get('/getEmployees/:_id', employeeProjectController.getEmployeeInProject);
router.post('/addemp', employeeProjectController.addEmployee);
router.patch('/removeemp/:_id', employeeProjectController.removeEmployee);

module.exports = router;