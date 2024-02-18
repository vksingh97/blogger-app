// store.js
import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './userDetails/userDetailsSlice';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
  },
});

export default store;
