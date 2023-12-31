const express = require('express');
const router = express.Router();
// authentication Middleware
const authMiddleware = require('../middleware/authMiddleware.js');
// user controllers
const {register, login, checkUser} = require("../controller/userController.js");


// register route
router.post('/register', register);

// login user
router.post('/login', login);

// check user
router.get('/check', authMiddleware,checkUser);

module.exports = router;
