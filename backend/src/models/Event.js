const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }],
  // canonical storage
  startUtc: { type: Date, required: true }, 
  endUtc: { type: Date, required: true },
  // store what timezone the event was created with (IANA string)
  timezone: { type: String, required: true },
  // creator info (optional)
  createdByProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  // convenience metadata
  createdAtUtc: { type: Date, default: Date.now },
  creatorTimezone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
