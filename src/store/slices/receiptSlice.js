// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getReceipts = createAsyncThunk(
  'auth/receipts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('receipts', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const receiptSlice = createSlice({
  name: 'receipts',
  initialState: {
    receipts: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getReceipts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReceipts.fulfilled, (state, action) => {
      state.loading = false;
      state.receipts = action.payload;
    });
    builder.addCase(getReceipts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default receiptSlice.reducer;
