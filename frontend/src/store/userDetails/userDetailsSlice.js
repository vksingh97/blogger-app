// userDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {},
  reducers: {
    updateUserDetails(state, action) {
      return action.payload;
    },
  },
});

export const { updateUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
