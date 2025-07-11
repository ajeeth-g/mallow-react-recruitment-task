import { login } from '../../api/reqres';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);

      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data.token;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);
