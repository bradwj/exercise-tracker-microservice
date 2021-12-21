const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  log: [{
    description: String,
    duration: Number,
    date: String,
    _id: false
  }]
})

module.exports = mongoose.model('Log', LogSchema);