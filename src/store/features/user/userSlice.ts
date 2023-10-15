import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken, user } = action.payload.data;
      state.accessToken = accessToken;
      state.user = user;
    },
    logOut(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export default userSlice.reducer;

export const { setCredentials, logOut } = userSlice.actions;
