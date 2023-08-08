import { configureStore } from '@reduxjs/toolkit';

import searchSlice from './slice/SearchSlice';

export const store = configureStore({
  reducer: {
    searchSlice: searchSlice,
  },
})