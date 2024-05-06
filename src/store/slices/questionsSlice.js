// features/yourFeatureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAxios } from '../api';
const token = localStorage.getItem('token');
export const getFormData = createAsyncThunk(
  'auth/formdata',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAxios('categories', 'GET', null, token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createCategory = createAsyncThunk(
  'auth/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios('categories', 'POST', data, token);

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createQuestion = createAsyncThunk(
  'auth/createQuestion',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `categories/${data.categoryId}/questions`,
        'POST',
        data.payload,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createAnswer = createAsyncThunk(
  'auth/createAnswer',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `/categories/${data.categoryId}/questions/${data.questionId}/answers`,
        'POST',
        data.payload,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  'auth/updateCategory',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `categories/${data.categoryId}`,
        'PUT',
        data.payload,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateQuestion = createAsyncThunk(
  'auth/updateQuestion',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `questions/${data.questionId}`,
        'PUT',
        data.payload,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateAnswer = createAsyncThunk(
  'auth/updateAnswer',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `answers/${data.answerId}`,
        'PUT',
        data.payload,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  'auth/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await fetchAxios(
        `categories/${categoryId}`,
        'DELETE',
        null,
        token
      );

      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  'auth/deleteQuestion',
  async (data, { rejectWithValue }) => {
    try {
      const result = await fetchAxios(
        `categories/${data.categoryId}/questions/${data.questionId}`,
        'DELETE',
        null,
        token
      );

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAnswer = createAsyncThunk(
  'auth/deleteAnswer',
  async (answerId, { rejectWithValue }) => {
    try {
      const data = await fetchAxios(
        `answers/${answerId}`,
        'DELETE',
        null,
        token
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'formdata',
  initialState: {
    formData: [],
  },
  reducers: {
    // reducers/actions
  },
  extraReducers: (builder) => {
    builder.addCase(getFormData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFormData.fulfilled, (state, action) => {
      state.loading = false;
      state.formData = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.formData = [
        ...state.formData,
        { ...action.payload, questions: [] },
      ];
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.formData = state.formData.filter((p) => p.id !== action.payload);
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.loading = false;
      const formData = [...state.formData];
      const categoryIndex = state.formData.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      formData[categoryIndex].questions = [
        ...formData[categoryIndex].questions,
        action.payload.question,
      ];
      state.formData = formData;
    });
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      state.loading = false;
      const formData = [...state.formData];
      const categoryIndex = state.formData.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      const questionIndex = formData[categoryIndex].questions.findIndex(
        (question) => question.id === action.payload.answer.question_id
      );
      formData[categoryIndex].questions[questionIndex].answers = [
        ...formData[categoryIndex].questions[questionIndex].answers,
        action.payload.answer,
      ];
      state.formData = formData;
    });
    builder.addCase(getFormData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
