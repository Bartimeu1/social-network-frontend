import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken, user } = action.payload.data;
      state.user = user;
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
    },
    logOut(state) {
      state.user = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export default userSlice.reducer;

export const { setCredentials, logOut } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectCurrentToken = () => localStorage.getItem('accessToken');
