const Profile = require('../models/Profile');

async function createProfile(req, res) {
  const { name, timezone } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const p = new Profile({ name, timezone: timezone || 'UTC' });
  await p.save();
  res.status(201).json(p);
}

async function listProfiles(req, res) {
  const profiles = await Profile.find().sort('name');
  res.json(profiles);
}

module.exports = { createProfile, listProfiles };
