export {};
const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');

// Map for authRoute

// @Path - /register - Public
// HTTP method - POST
// @response - navigate to /login

// @Path - /login - Public
// HTTP method - POST
// @response - jwt


router.post('/register', register);
router.post('/login', login);

module.exports = router;
