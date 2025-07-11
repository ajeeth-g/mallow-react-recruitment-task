import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
} from './usersThunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    currentUser: null,
    searchTerm: '',
    viewMode: 'table',
    pagination: {
      page: 1,
      per_page: 6,
      total: 0,
      total_pages: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addCase(updateExistingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteExistingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setViewMode, setPage } = usersSlice.actions;
export default usersSlice.reducer;
