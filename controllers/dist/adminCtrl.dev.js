"use strict";

var doctorModel = require('../models/doctorModel');

var userModel = require('../models/userModels');

var user = require('../models/userModels');

var getALLUsersControllers = function getALLUsersControllers(req, res) {
  var users;
  return regeneratorRuntime.async(function getALLUsersControllers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.find({}));

        case 3:
          users = _context.sent;
          res.status(200).send({
            success: true,
            message: 'users data list',
            data: users
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            success: false,
            message: 'error while fetching users',
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getALLDoctorsControllers = function getALLDoctorsControllers(req, res) {
  var doctors;
  return regeneratorRuntime.async(function getALLDoctorsControllers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(doctorModel.find({}));

        case 3:
          doctors = _context2.sent;
          res.status(200).send({
            success: true,
            message: 'doctors data list',
            data: doctors
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send({
            success: false,
            message: 'error while fetching doctors data',
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // status controller


var changeAccountStatusControllers = function changeAccountStatusControllers(req, res) {
  var _req$body, doctorId, status, doctor, _user, notification;

  return regeneratorRuntime.async(function changeAccountStatusControllers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, doctorId = _req$body.doctorId, status = _req$body.status;
          _context3.next = 4;
          return regeneratorRuntime.awrap(doctorModel.findByIdAndUpdate(doctorId, {
            status: status
          }));

        case 4:
          doctor = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: doctor.userId
          }));

        case 7:
          _user = _context3.sent;
          notification = _user.notification;
          notification.push({
            type: 'doctor-account-request-updated',
            message: "Your doctor Account Request Has ".concat(status),
            onClickPath: 'notification'
          });
          _user.isDoctor = status === 'approved' ? true : false;
          _context3.next = 13;
          return regeneratorRuntime.awrap(_user.save());

        case 13:
          res.status(201).send({
            success: true,
            message: 'account status updated',
            data: doctor
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send({
            success: false,
            message: 'Error in Account Status',
            error: _context3.t0
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = {
  getALLUsersControllers: getALLUsersControllers,
  getALLDoctorsControllers: getALLDoctorsControllers,
  changeAccountStatusControllers: changeAccountStatusControllers
};