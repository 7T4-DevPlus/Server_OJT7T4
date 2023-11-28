const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const controller = require('../controllers/auth.controller');

router.get('/', authJwt.verifyToken, controller.auth)
router.post('/register', controller.register)
router.post('/login', controller.login)

module.exports = router;