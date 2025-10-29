const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timezone: { type: String, default: 'UTC' } // IANA timezone like "Asia/Kolkata"
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
