// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getServices = createAsyncThunk(
    'auth/services',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAxios('services', 'GET', null, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteService = createAsyncThunk(
    'auth/deleteService',
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`services/${id}`, 'DELETE', null, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getService = createAsyncThunk(
    'auth/getService',
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`services/${id}`, 'GET', null, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateService = createAsyncThunk(
    'auth/updateService',
    async (data, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`services/${data.id}`, 'PUT', data, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createService = createAsyncThunk(
    'auth/createService',
    async (data, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`services`, 'POST', data, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateServiceImage = createAsyncThunk(
    'auth/updateServiceImage',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`services/${id}`, 'PUT', formData, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        currentService: {}
    },
    reducers: {
        // reducers/actions
    },
    extraReducers: (builder) => {
        builder.addCase(getServices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
        });
        builder.addCase(getService.fulfilled, (state, action) => {
            state.loading = false;
            state.currentService = action.payload;
        });
        builder.addCase(getServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default serviceSlice.reducer;
