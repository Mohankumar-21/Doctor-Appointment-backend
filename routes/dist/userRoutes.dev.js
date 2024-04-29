"use strict";

var express = require('express');

var _require = require('../controllers/userCtrl'),
    loginController = _require.loginController,
    registerController = _require.registerController,
    authController = _require.authController,
    ProfileController = _require.ProfileController,
    applyDoctorController = _require.applyDoctorController,
    getAllNotificationController = _require.getAllNotificationController,
    DeleteAllNotificationController = _require.DeleteAllNotificationController,
    getAllDoctorController = _require.getAllDoctorController,
    bookAppointmentController = _require.bookAppointmentController,
    bookingAvailabilityController = _require.bookingAvailabilityController,
    userAppointmentListController = _require.userAppointmentListController;

var authMiddleware = require("../middlewares/authMiddleware"); //Roter object


var router = express.Router();
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/userInfo', authMiddleware, ProfileController); //AUTH || POST 

router.post("/getUserdata", authMiddleware, authController); //Apply Doctor || POST

router.post("/apply-doctor", authMiddleware, applyDoctorController); //Notification Doctor || POST

router.post("/get-all-notification", authMiddleware, getAllNotificationController); //Delete Notification Doctor || POST

router.post("/delete-all-notification", authMiddleware, DeleteAllNotificationController); // Get All doc

router.get('/getAllDoctors', authMiddleware, getAllDoctorController); // Book Appointment

router.post('/book-appointment', authMiddleware, bookAppointmentController); // Availability Checking

router.post('/booking-availability', authMiddleware, bookingAvailabilityController); //Appointment List 

router.get('/user-appointments', authMiddleware, userAppointmentListController);
module.exports = router;