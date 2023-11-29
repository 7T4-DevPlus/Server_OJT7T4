const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/multer");

const controller = require('../controllers/employee.controller');

router.get('/', controller.list);
router.get('/details/:_id', controller.details);
router.post('/create', controller.create, upload.single("image"));
router.patch('/update/:_id', controller.update, upload.single("image"));
router.delete('/delete/:_id', controller.delete);

module.exports = router;