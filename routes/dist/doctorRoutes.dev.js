"use strict";

var express = require('express');

var authMiddleware = require('../middlewares/authMiddleware');

var _require = require('./../controllers/DoctorCtrl'),
    getDoctorInfoController = _require.getDoctorInfoController,
    updateProfileControlller = _require.updateProfileControlller,
    getDoctorByIdController = _require.getDoctorByIdController,
    getDoctorAppointmentsController = _require.getDoctorAppointmentsController,
    updateStatusController = _require.updateStatusController;

var router = express.Router(); //POST SINGLE DOC INFO

router.post('/getDoctorinfo', authMiddleware, getDoctorInfoController); //Post update Profile

router.post('/updateProfile', authMiddleware, updateProfileControlller); //POST GET SINGLE DOC INFO

router.post('/getDoctorById', authMiddleware, getDoctorByIdController); //GET Appointments

router.get('/doctor-appointments', authMiddleware, getDoctorAppointmentsController); //Post update Status

router.post('/update-status', authMiddleware, updateStatusController);
module.exports = router;