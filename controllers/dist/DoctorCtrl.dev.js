"use strict";

var doctorModel = require('../models/doctorModel');

var appointmentModel = require('../models/AppointmentModel');

var userModel = require('../models/userModels');

var getDoctorInfoController = function getDoctorInfoController(req, res) {
  var doctor;
  return regeneratorRuntime.async(function getDoctorInfoController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(doctorModel.findOne({
            userId: req.body.userId
          }));

        case 3:
          doctor = _context.sent;
          res.status(200).send({
            success: true,
            message: 'doctor data fetch success',
            data: doctor
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            success: false,
            message: 'Error Fetching in Doctor Details',
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // update profile controller


var updateProfileControlller = function updateProfileControlller(req, res) {
  var doctor;
  return regeneratorRuntime.async(function updateProfileControlller$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(doctorModel.findOneAndUpdate({
            userId: req.body.userId
          }, req.body));

        case 3:
          doctor = _context2.sent;
          res.status(201).send({
            success: true,
            message: 'Doctor Profile Updated',
            data: doctor
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send({
            success: false,
            message: 'Doctor profile update issue',
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get doctor booking application 


var getDoctorByIdController = function getDoctorByIdController(req, res) {
  var doctor;
  return regeneratorRuntime.async(function getDoctorByIdController$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(doctorModel.findOne({
            _id: req.body.doctorId
          }));

        case 3:
          doctor = _context3.sent;
          res.status(200).send({
            success: true,
            message: 'Single doctor information fetched',
            data: doctor
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send({
            success: false,
            message: 'error in doctor information',
            error: _context3.t0
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get Docto rAppointments Controller


var getDoctorAppointmentsController = function getDoctorAppointmentsController(req, res) {
  var doctor, appointments;
  return regeneratorRuntime.async(function getDoctorAppointmentsController$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(doctorModel.findOne({
            userId: req.body.userId
          }));

        case 3:
          doctor = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(appointmentModel.find({
            doctorId: doctor._id
          }));

        case 6:
          appointments = _context4.sent;
          res.status(200).send({
            success: true,
            message: ' Doctors appointments fetch Successfully',
            data: appointments
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send({
            success: false,
            message: 'error in doctor appointments',
            error: _context4.t0
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // update Status Controller


var updateStatusController = function updateStatusController(req, res) {
  var _req$body, appointmentsId, status, appointments, user, notification;

  return regeneratorRuntime.async(function updateStatusController$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body = req.body, appointmentsId = _req$body.appointmentsId, status = _req$body.status;
          _context5.next = 4;
          return regeneratorRuntime.awrap(appointmentModel.findByIdAndUpdate(appointmentsId, {
            status: status
          }));

        case 4:
          appointments = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: appointments.userId
          }));

        case 7:
          user = _context5.sent;
          notification = user.notification;
          notification.push({
            type: 'status-updated',
            message: " Your appointment has been updated ".concat(status, " "),
            onClickPath: '/doctor-appointments'
          });
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).send({
            success: true,
            message: "Appointment status updated"
          });
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send({
            success: false,
            message: 'error in update status',
            error: _context5.t0
          });

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  getDoctorInfoController: getDoctorInfoController,
  updateProfileControlller: updateProfileControlller,
  getDoctorByIdController: getDoctorByIdController,
  getDoctorAppointmentsController: getDoctorAppointmentsController,
  updateStatusController: updateStatusController
};