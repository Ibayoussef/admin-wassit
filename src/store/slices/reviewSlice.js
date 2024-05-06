// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getReviews = createAsyncThunk(
  'auth/reviews',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('reviews', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default reviewSlice.reducer;
