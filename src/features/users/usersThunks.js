import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../api/reqres';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (page, { rejectWithValue }) => {
    try {
      const response = await getUsers(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUser(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewUser = createAsyncThunk(
  'users/create',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return { ...userData, id: response.data.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExistingUser = createAsyncThunk(
  'users/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      await updateUser(id, userData);
      return { id, ...userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExistingUser = createAsyncThunk(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
