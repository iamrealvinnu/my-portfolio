const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  category: { type: String, default: 'general' },
  replies: [{
    content: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Message', messageSchema); 