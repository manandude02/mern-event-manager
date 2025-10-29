const Event = require('../models/Event');
const Profile = require('../models/Profile');
const { validateStartEndLocal } = require('../utils/validators');

async function createEvent(req, res) {
  const { title, description, profiles: profileIds, startLocal, endLocal, timezone, createdByProfile } = req.body;
  if (!title || !profileIds || profileIds.length === 0 || !startLocal || !endLocal || !timezone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // validate profiles exist
  const count = await Profile.countDocuments({ _id: { $in: profileIds } });
  if (count !== profileIds.length) return res.status(400).json({ message: 'Some profiles not found' });

  const v = validateStartEndLocal(startLocal, endLocal, timezone);
  if (!v.ok) return res.status(400).json({ message: v.msg });

  const ev = new Event({
    title,
    description,
    profiles: profileIds,
    startUtc: v.startUtc,
    endUtc: v.endUtc,
    timezone,
    createdByProfile,
    creatorTimezone: timezone,
    createdAtUtc: new Date()
  });
  await ev.save();
  // populate a bit for response
  await ev.populate('profiles', 'name timezone');
  res.status(201).json(ev);
}

async function updateEvent(req, res) {
  const id = req.params.id;
  const { title, description, startLocal, endLocal, timezone } = req.body;
  const ev = await Event.findById(id);
  if (!ev) return res.status(404).json({ message: 'Event not found' });

  // check if event applies to requester profile? (business rules said any user can update events assigned to them)
  // That check is left to caller (or could accept a profileId and confirm it is in ev.profiles)

  if (startLocal && endLocal && timezone) {
    const v = validateStartEndLocal(startLocal, endLocal, timezone);
    if (!v.ok) return res.status(400).json({ message: v.msg });
    ev.startUtc = v.startUtc;
    ev.endUtc = v.endUtc;
    ev.timezone = timezone;
  }
  if (title) ev.title = title;
  if (description) ev.description = description;
  ev.updatedAt = new Date();
  await ev.save();
  await ev.populate('profiles', 'name timezone');
  res.json(ev);
}

async function listEventsForProfile(req, res) {
  const profileId = req.params.profileId;
  // optional: filter by date range using UTC or local range param
  const events = await Event.find({ profiles: profileId }).populate('profiles', 'name timezone').sort('startUtc');
  res.json(events);
}

module.exports = { createEvent, updateEvent, listEventsForProfile };
