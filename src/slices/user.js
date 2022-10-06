import { createSlice } from '@reduxjs/toolkit';

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    u: '111',
    p: '222',
  },
  reducers: {
    setUsername: (state, action) => {
      state.u = action.payload;
    },
    setPassword: (state, action) => {
      state.p = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setUsername, setPassword } = userSlice.actions;
