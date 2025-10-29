import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:4000/api';

export const fetchEventsForProfile = createAsyncThunk('events/fetchForProfile', async (profileId) => {
  const res = await axios.get(`${API}/events/profile/${profileId}`);
  return res.data;
});

export const createEvent = createAsyncThunk('events/create', async (payload) => {
  const res = await axios.post(`${API}/events`, payload);
  return res.data;
});

export const updateEvent = createAsyncThunk('events/update', async ({ id, payload }) => {
  const res = await axios.put(`${API}/events/${id}`, payload);
  return res.data;
});

const slice = createSlice({
  name: 'events',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEventsForProfile.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(createEvent.fulfilled, (state, action) => {
      state.items.push(action.payload);
    }).addCase(updateEvent.fulfilled, (state, action) => {
      const idx = state.items.findIndex(e => e._id === action.payload._id);
      if (idx >= 0) state.items[idx] = action.payload;
    });
  }
});

export default slice.reducer;
