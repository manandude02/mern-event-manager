import React from 'react';
import { useDispatch } from 'react-redux';
import { utcToLocalString } from '../utils/time';
import { updateEvent } from '../features/events/eventsSlice';

export default function EventList({ events, currentProfile }) {
  const dispatch = useDispatch();

  const handleQuickExtend = async (ev) => {
    // example update: push end by +30 minutes (client converts local -> sends timezone/local)
    const tz = currentProfile.timezone || 'UTC';
    const endLocal = utcToLocalString(ev.endUtc, tz, 'YYYY-MM-DDTHH:mm'); // make datetime-local input compatible string
    // parse and add 30 min using dayjs client-side if you want — for brevity, demonstrate sending updated times:
    // (Better: compute new endLocal in client with dayjs then send)
    // For demo, just alert user; real update would compute new local then dispatch updateEvent...
    alert(`To update, compute new local end and call update API with startLocal, endLocal and timezone.`);
  };

  return (
    <div>
      <h3>Your Events</h3>
      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            <div><strong>{ev.title}</strong></div>
            <div>{ev.description}</div>
            <div>
              Start: {utcToLocalString(ev.startUtc, currentProfile.timezone)} —
              End: {utcToLocalString(ev.endUtc, currentProfile.timezone)}
            </div>
            <div>Assigned to: {ev.profiles.map(p => p.name).join(', ')}</div>
            <div>
              <button onClick={() => handleQuickExtend(ev)}>Quick extend</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
