"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userModel = require('../models/userModels');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var doctorModel = require('../models/doctorModel');

var appointmentModel = require('../models/AppointmentModel');

var moment = require('moment'); //Login


var loginController = function loginController(req, res) {
  var user, isMatch, token;
  return regeneratorRuntime.async(function loginController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.body.email
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(200).send({
            message: "user not found",
            success: false
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 8:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(200).send({
            message: "invalid email or password",
            success: false
          }));

        case 11:
          token = jwt.sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          });
          res.status(200).send({
            message: "Login success",
            success: true,
            token: token
          });
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            message: "Error in Login CTRL : ".concat(_context.t0.message)
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // Register


var registerController = function registerController(req, res) {
  var existingUser, password, salt, hashedPassword, newUser;
  return regeneratorRuntime.async(function registerController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.body.email
          }));

        case 3:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(200).send({
            message: "user already exists",
            success: false
          }));

        case 6:
          password = req.body.password;
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          hashedPassword = _context2.sent;
          req.body.password = hashedPassword;
          newUser = new userModel(req.body);
          _context2.next = 17;
          return regeneratorRuntime.awrap(newUser.save());

        case 17:
          res.status(201).send({
            message: "Register Successfully",
            success: true
          });
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send({
            success: false,
            message: "Register Controller ".concat(_context2.t0.message)
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
}; //Auth 


var authController = function authController(req, res) {
  var user;
  return regeneratorRuntime.async(function authController$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(userModel.findById({
            _id: req.body.userId
          }));

        case 3:
          user = _context3.sent;
          user.password = undefined;

          if (user) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(200).send({
            message: 'user not found',
            success: false
          }));

        case 9:
          res.status(200).send({
            success: true,
            data: user
          });

        case 10:
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send({
            message: 'auth error',
            success: false,
            error: _context3.t0
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // Apply Doctor


var applyDoctorController = function applyDoctorController(req, res) {
  var newDoctor, adminUser, notification;
  return regeneratorRuntime.async(function applyDoctorController$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(doctorModel(_objectSpread({}, req.body, {
            status: 'pending'
          })));

        case 3:
          newDoctor = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(newDoctor.save());

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(userModel.findOne({
            isAdmin: true
          }));

        case 8:
          adminUser = _context4.sent;
          notification = adminUser.notification;
          notification.push({
            type: 'apply-doctor-request',
            message: "".concat(newDoctor.firstname, " ").concat(newDoctor.lastname, " Has Applied For A Doctor Account"),
            data: {
              doctorId: newDoctor._id,
              name: newDoctor.firstname + " " + newDoctor.lastname,
              onClickPath: '/admin/doctors'
            }
          });
          _context4.next = 13;
          return regeneratorRuntime.awrap(userModel.findByIdAndUpdate(adminUser._id, {
            notification: notification
          }));

        case 13:
          res.status(201).send({
            success: true,
            message: 'Doctor Accounr Applied Successfully'
          });
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send({
            success: false,
            error: _context4.t0,
            message: 'Error While Applying Doctor'
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Notification controller


var getAllNotificationController = function getAllNotificationController(req, res) {
  var user, seennotification, notification, updatedUser;
  return regeneratorRuntime.async(function getAllNotificationController$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: req.body.userId
          }));

        case 3:
          user = _context5.sent;
          seennotification = user.seennotification;
          notification = user.notification;
          seennotification.push.apply(seennotification, _toConsumableArray(notification));
          user.notification = [];
          user.seennotification = notification;
          _context5.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          updatedUser = _context5.sent;
          res.status(200).send({
            success: true,
            message: 'all notification marked as read',
            data: updatedUser
          });
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send({
            message: 'Error in notification',
            success: false,
            error: _context5.t0
          });

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; //Delete Notification 


var DeleteAllNotificationController = function DeleteAllNotificationController(req, res) {
  var user, updatedUser;
  return regeneratorRuntime.async(function DeleteAllNotificationController$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: req.body.userId
          }));

        case 3:
          user = _context6.sent;
          user.notification = [];
          user.seennotification = [];
          _context6.next = 8;
          return regeneratorRuntime.awrap(user.save());

        case 8:
          updatedUser = _context6.sent;
          updatedUser.password = undefined;
          res.status(200).send({
            success: true,
            message: 'Notifications Deleted successfully',
            data: updatedUser
          });
          _context6.next = 17;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).send({
            success: false,
            message: 'Unable to delete all notification',
            error: _context6.t0
          });

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // All doctor controller


var getAllDoctorController = function getAllDoctorController(req, res) {
  var doctors;
  return regeneratorRuntime.async(function getAllDoctorController$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(doctorModel.find({
            status: 'approved'
          }));

        case 3:
          doctors = _context7.sent;
          res.status(200).send({
            success: true,
            message: 'Doctor Lists Fetched Successfully',
            data: doctors
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0), res.send(500).send({
            success: false,
            message: 'Error while fetching doctor',
            error: _context7.t0
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Booking appointment Controller 


var bookAppointmentController = function bookAppointmentController(req, res) {
  var newAppointment, user;
  return regeneratorRuntime.async(function bookAppointmentController$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
          req.body.time = moment(req.body.time, 'HH:mm').toISOString();
          req.body.status = 'pending';
          newAppointment = new appointmentModel(req.body);
          _context8.next = 7;
          return regeneratorRuntime.awrap(newAppointment.save());

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(userModel.findById(req.body.doctorInfo.userId));

        case 9:
          user = _context8.sent;
          user.notification.push({
            type: 'New-appointment-request',
            message: " A New Appointment Request from ".concat(req.body.userInfo.name, " "),
            onClickPath: '/user/appointments'
          });
          _context8.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(200).send({
            success: true,
            message: 'Appointment Book Successfully'
          });
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).send({
            success: false,
            message: 'Error while booking appointment',
            error: _context8.t0
          });

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Booking Availability Controller


var bookingAvailabilityController = function bookingAvailabilityController(req, res) {
  var _req$body, date, time, doctorId, isoDate, fromTime, toTime, appointments;

  return regeneratorRuntime.async(function bookingAvailabilityController$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body = req.body, date = _req$body.date, time = _req$body.time, doctorId = _req$body.doctorId;

          if (!(!date || !time || !doctorId)) {
            _context9.next = 4;
            break;
          }

          return _context9.abrupt("return", res.status(400).send({
            success: false,
            message: 'Incomplete request. Please provide date, time, and doctorId.'
          }));

        case 4:
          isoDate = moment(date, 'DD-MM-YYYY').toISOString();
          fromTime = moment(time, 'HH:mm').subtract(1, 'hours').toISOString();
          toTime = moment(time, 'HH:mm').add(1, 'hours').toISOString();
          _context9.next = 9;
          return regeneratorRuntime.awrap(appointmentModel.find({
            doctorId: doctorId,
            date: isoDate,
            time: {
              $gte: fromTime,
              $lte: toTime
            }
          }));

        case 9:
          appointments = _context9.sent;

          if (!(appointments.length > 0)) {
            _context9.next = 14;
            break;
          }

          return _context9.abrupt("return", res.status(200).send({
            success: true,
            available: false,
            message: 'Appointment not available at this time.'
          }));

        case 14:
          return _context9.abrupt("return", res.status(200).send({
            success: true,
            available: true,
            message: 'Appointments available.'
          }));

        case 15:
          _context9.next = 21;
          break;

        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          res.status(500).send({
            success: false,
            message: 'Error in booking availability check.',
            error: _context9.t0
          });

        case 21:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // user Appointment List Controller


var userAppointmentListController = function userAppointmentListController(req, res) {
  var appointments;
  return regeneratorRuntime.async(function userAppointmentListController$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(appointmentModel.find({
            userId: req.body.userId
          }));

        case 3:
          appointments = _context10.sent;
          res.status(200).send({
            success: true,
            message: 'Users Appointmnets fetched successfully',
            data: appointments
          });
          _context10.next = 11;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).send({
            success: false,
            message: 'Error In User Appointments',
            error: _context10.t0
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Profile Controller


var ProfileController = function ProfileController(req, res) {
  var user;
  return regeneratorRuntime.async(function ProfileController$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            userId: req.query.userId
          }));

        case 3:
          user = _context11.sent;

          if (user) {
            _context11.next = 6;
            break;
          }

          return _context11.abrupt("return", res.status(404).json({
            success: false,
            message: 'User not found'
          }));

        case 6:
          res.status(200).json({
            success: true,
            message: 'User data fetch success',
            data: user
          });
          _context11.next = 13;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.error('Error fetching user details:', _context11.t0);
          res.status(500).json({
            success: false,
            message: 'Error fetching user details',
            error: _context11.t0.message
          });

        case 13:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  registerController: registerController,
  loginController: loginController,
  authController: authController,
  applyDoctorController: applyDoctorController,
  getAllNotificationController: getAllNotificationController,
  DeleteAllNotificationController: DeleteAllNotificationController,
  getAllDoctorController: getAllDoctorController,
  bookAppointmentController: bookAppointmentController,
  bookingAvailabilityController: bookingAvailabilityController,
  userAppointmentListController: userAppointmentListController,
  ProfileController: ProfileController
};