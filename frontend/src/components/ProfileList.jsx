import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, createProfile } from '../features/profiles/profilesSlice';

export default function ProfileList({ onSelectProfile }) {
  const dispatch = useDispatch();
  const profiles = useSelector(s => s.profiles.items);
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');

  useEffect(() => { dispatch(fetchProfiles()); }, [dispatch]);

  const handleCreate = async () => {
    if (!name) return alert('Enter name');
    await dispatch(createProfile({ name, timezone }));
    setName('');
  };

  return (
    <div>
      <h3>Profiles</h3>
      <ul>
        {profiles.map(p => (
          <li key={p._id}>
            <button onClick={() => onSelectProfile(p)}>{p.name} — {p.timezone || 'UTC'}</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="timezone (IANA)" value={timezone} onChange={e => setTimezone(e.target.value)} />
        <button onClick={handleCreate}>Create Profile</button>
      </div>
    </div>
  );
}
