// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getRequests = createAsyncThunk(
  'auth/requests',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('requests', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateRequest = createAsyncThunk(
  'auth/updateRequests',
  async (data, { rejectWithValue }) => {
    const { requestId, status } = data;
    try {
      const data = await fetchAxios(
        `requests/${requestId}`,
        'PUT',
        status,
        token
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    });
    builder.addCase(getRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default requestSlice.reducer;
