// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getMessages = createAsyncThunk(
  'auth/messages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('chat/messages', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default messagesSlice.reducer;
