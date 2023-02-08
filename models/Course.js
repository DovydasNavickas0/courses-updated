const mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: String,
  date: { type: Date, default: Date.now },
  isPublished: Boolean
  }));

module.exports = Course;