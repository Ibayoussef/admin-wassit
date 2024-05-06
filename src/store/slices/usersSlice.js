// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getUsers = createAsyncThunk(
  'auth/users',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('users', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
