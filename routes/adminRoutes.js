const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const { getALLUsersControllers, 
        getALLDoctorsControllers,
        changeAccountStatusControllers,
       } = require('../controllers/adminCtrl');


const router = express.Router();

//GET METHOD || USERS

router.get('/getAllUsers', authMiddleware, getALLUsersControllers);

//GET METHOD || Doctors

router.get('/getAllDoctors', authMiddleware, getALLDoctorsControllers);

//POST ACCOUNT STATUS

router.post('/changeAccountStatus', authMiddleware, changeAccountStatusControllers);

module.exports = router;