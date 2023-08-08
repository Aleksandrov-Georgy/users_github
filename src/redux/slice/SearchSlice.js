import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  usersAll: [],
  searchInput: '',
};

const searchSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, actions) => {
      state.users = actions.payload;
    },
    setSearchInput: (state, actions) => {
      state.searchInput = actions.payload;
    },
    setUsersAll: (state, actions) => {
      state.usersAll = actions.payload;
    },
  },
});

export const { setUsers, setSearchInput, setUsersAll } = searchSlice.actions;

export default searchSlice.reducer;
