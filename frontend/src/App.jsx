import React, { useState } from 'react';
import ProfileList from './components/ProfileList';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventsForProfile } from './features/events/eventsSlice';

export default function App() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const profiles = useSelector(s => s.profiles.items);
  const events = useSelector(s => s.events.items);
  const dispatch = useDispatch();

  const onSelectProfile = (p) => {
    setCurrentProfile(p);
    dispatch(fetchEventsForProfile(p._id));
  };

  return (
    <div style={{ display: 'flex', gap: 40 }}>
      <div style={{ width: 300 }}>
        <ProfileList onSelectProfile={onSelectProfile} />
      </div>

      <div style={{ flex: 1 }}>
        {currentProfile ? (
          <>
            <h2>Selected: {currentProfile.name} ({currentProfile.timezone})</h2>
            <EventForm profiles={profiles} currentProfile={currentProfile} />
            <EventList events={events} currentProfile={currentProfile} />
          </>
        ) : (
          <div>Select a profile to manage events</div>
        )}
      </div>
    </div>
  );
}
