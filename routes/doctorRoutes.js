const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, 
       updateProfileControlller,
       getDoctorByIdController,
       getDoctorAppointmentsController,
       updateStatusController,
    
    } = require('./../controllers/DoctorCtrl');


const router =express.Router();

//POST SINGLE DOC INFO

router.post('/getDoctorinfo', authMiddleware, getDoctorInfoController);

//Post update Profile

router.post('/updateProfile', authMiddleware, updateProfileControlller);

//POST GET SINGLE DOC INFO

router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//GET Appointments

router.get('/doctor-appointments', authMiddleware, getDoctorAppointmentsController);

//Post update Status

router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;