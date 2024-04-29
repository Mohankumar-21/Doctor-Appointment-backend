"use strict";

var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorInfo: {
    type: String,
    required: true
  },
  userInfo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    "default": 'pending'
  },
  time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var appointmentModel = mongoose.model('appointments', appointmentSchema);
module.exports = appointmentModel;