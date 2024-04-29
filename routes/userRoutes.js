const express = require('express');
const { loginController,
         registerController, 
         authController, 
         ProfileController,
         applyDoctorController,
         getAllNotificationController,
         DeleteAllNotificationController,
         getAllDoctorController,
         bookAppointmentController,
         bookingAvailabilityController,
         userAppointmentListController,
    
       } = require('../controllers/userCtrl');


const authMiddleware = require("../middlewares/authMiddleware");

//Roter object
const router = express.Router();


router.post('/login',loginController);
router.post('/register',registerController);

router.post('/userInfo',authMiddleware, ProfileController);

//AUTH || POST 
router.post("/getUserdata", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification Doctor || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

//Delete Notification Doctor || POST
router.post("/delete-all-notification", authMiddleware, DeleteAllNotificationController);

// Get All doc

router.get('/getAllDoctors', authMiddleware, getAllDoctorController);

// Book Appointment

router.post('/book-appointment', authMiddleware, bookAppointmentController);

// Availability Checking

router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

//Appointment List 

router.get('/user-appointments', authMiddleware, userAppointmentListController);

module.exports = router;