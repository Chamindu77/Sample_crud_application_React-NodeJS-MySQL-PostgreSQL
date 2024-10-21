const express = require('express');
const { registration, login, getUser } = require('../Controllers/userControllers');
const auth = require('../middleware/auth');  
const router = express.Router();

router.post("/api/u/register", registration);

router.post("/api/u/login", login);

router.get("/api/u/user", auth, getUser);

module.exports = router;
