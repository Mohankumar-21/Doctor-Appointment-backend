"use strict";

var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  firstname: {
    type: String,
    required: [true, 'first name is require']
  },
  lastname: {
    type: String,
    required: [true, 'last name is require']
  },
  phone: {
    type: String,
    required: [true, 'phone no is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  website: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  Specialization: {
    type: String,
    required: [true, 'specialization is required']
  },
  experience: {
    type: String,
    required: [true, 'experience is required']
  },
  feesPerConsultation: {
    type: Number,
    required: [true, 'fee is required']
  },
  status: {
    type: String,
    "default": 'pending'
  },
  timings: {
    type: Object,
    required: [true, 'Work timing is required']
  }
}, {
  timestamps: true
});
var doctorModel = mongoose.model('Doctors', doctorSchema);
module.exports = doctorModel;