const express = require('express');
const router = express.Router();
const { createEvent, updateEvent, listEventsForProfile } = require('../controllers/eventsCtrl');

router.post('/', createEvent);
router.put('/:id', updateEvent);
router.get('/profile/:profileId', listEventsForProfile);

module.exports = router;
