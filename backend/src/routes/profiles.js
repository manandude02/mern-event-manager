const express = require('express');
const router = express.Router();
const { createProfile, listProfiles } = require('../controllers/profilesCtrl');

router.post('/', createProfile);
router.get('/', listProfiles);

module.exports = router;
