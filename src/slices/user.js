import { createSlice } from '@reduxjs/toolkit';

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export default userSlice.reducer;
const { setUsername, setPassword } = userSlice.actions;
