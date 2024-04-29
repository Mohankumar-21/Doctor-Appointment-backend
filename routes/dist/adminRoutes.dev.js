"use strict";

var express = require('express');

var authMiddleware = require("../middlewares/authMiddleware");

var _require = require('../controllers/adminCtrl'),
    getALLUsersControllers = _require.getALLUsersControllers,
    getALLDoctorsControllers = _require.getALLDoctorsControllers,
    changeAccountStatusControllers = _require.changeAccountStatusControllers;

var router = express.Router(); //GET METHOD || USERS

router.get('/getAllUsers', authMiddleware, getALLUsersControllers); //GET METHOD || Doctors

router.get('/getAllDoctors', authMiddleware, getALLDoctorsControllers); //POST ACCOUNT STATUS

router.post('/changeAccountStatus', authMiddleware, changeAccountStatusControllers);
module.exports = router;