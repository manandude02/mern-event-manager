const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const profilesRoutes = require('./routes/profiles');
const eventsRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/profiles', profilesRoutes);
app.use('/api/events', eventsRoutes);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/event-manager';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo connect err', err);
  });
