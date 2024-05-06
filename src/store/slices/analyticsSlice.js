// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getAnalytics = createAsyncThunk(
    'auth/analytics',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAxios('analytics', 'GET', null, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        analytics: [],
    },
    reducers: {
        // reducers/actions
    },
    extraReducers: (builder) => {
        builder.addCase(getAnalytics.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAnalytics.fulfilled, (state, action) => {
            state.loading = false;
            state.analytics = action.payload;
        });
        builder.addCase(getAnalytics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default analyticsSlice.reducer;
