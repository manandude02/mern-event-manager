import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:4000/api';

export const fetchProfiles = createAsyncThunk('profiles/fetch', async () => {
  const res = await axios.get(`${API}/profiles`);
  return res.data;
});

export const createProfile = createAsyncThunk('profiles/create', async (payload) => {
  const res = await axios.post(`${API}/profiles`, payload);
  return res.data;
});

const slice = createSlice({
  name: 'profiles',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.items = action.payload;
    }).addCase(createProfile.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});

export default slice.reducer;
