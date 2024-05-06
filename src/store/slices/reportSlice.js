// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getReports = createAsyncThunk(
  'auth/reports',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('reports', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(getReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default reportSlice.reducer;
