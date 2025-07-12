import { login } from '../../api/reqres';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;

      if (email !== 'eve.holt@reqres.in' || password !== 'cityslicka') {
        return rejectWithValue('Invalid email or password');
      }

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
