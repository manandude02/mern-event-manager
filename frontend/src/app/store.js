import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from '../features/profiles/profilesSlice';
import eventsReducer from '../features/events/eventsSlice';

const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer
  }
});

export default store;

