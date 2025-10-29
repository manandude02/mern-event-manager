import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from '../features/profiles/profilesSlice';
import eventsReducer from '../features/events/eventsSlice';

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer
  }
});
