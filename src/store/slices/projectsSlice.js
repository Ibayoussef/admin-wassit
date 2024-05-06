// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getProjects = createAsyncThunk(
    'auth/getProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchAxios('projects', 'GET', null, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const assignProject = createAsyncThunk(
    'auth/getProjects',
    async ({ id, proId }, { rejectWithValue }) => {
        try {
            const data = await fetchAxios(`projects/${id}/assign`, 'GET', { pro_id: proId }, token);

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
    },
    reducers: {
        // reducers/actions
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload;
        });
        builder.addCase(getProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default projectsSlice.reducer;
