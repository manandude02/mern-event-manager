import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../features/events/eventsSlice';
import { localToUtcIso } from '../utils/time';

// props: profiles (all), currentProfile (object), optional existingEvent for edit
export default function EventForm({ profiles, currentProfile, onDone }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState(currentProfile ? [currentProfile._id] : []);
  const [timezone, setTimezone] = useState(currentProfile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
  const [startLocal, setStartLocal] = useState(''); // "2025-10-28T09:00"
  const [endLocal, setEndLocal] = useState('');

  const toggleProfile = id => {
    setSelectedProfiles(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleCreate = async () => {
    if (!title || !selectedProfiles.length || !startLocal || !endLocal || !timezone) return alert('Missing fields');
    // convert local times in timezone to ISO (UTC) on server — we will send local strings + timezone, server converts
    const payload = {
      title,
      description: desc,
      profiles: selectedProfiles,
      startLocal,
      endLocal,
      timezone,
      createdByProfile: currentProfile?._id
    };
    await dispatch(createEvent(payload));
    setTitle(''); setDesc(''); setStartLocal(''); setEndLocal('');
    if (onDone) onDone();
  };

  return (
    <div>
      <h3>Create Event</h3>
      <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="description" value={desc} onChange={e => setDesc(e.target.value)} />
      <div>
        <label>Profiles</label>
        <div>
          {profiles.map(p => (
            <label key={p._id} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={selectedProfiles.includes(p._id)} onChange={() => toggleProfile(p._id)} /> {p.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <input type="text" value={timezone} onChange={e => setTimezone(e.target.value)} placeholder="Timezone (IANA)" />
      </div>
      <div>
        <label>Start</label>
        <input type="datetime-local" value={startLocal} onChange={e => setStartLocal(e.target.value)} />
      </div>
      <div>
        <label>End</label>
        <input type="datetime-local" value={endLocal} onChange={e => setEndLocal(e.target.value)} />
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
