import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../services/api';
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
    setP: (state, action) => {
      state.p = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("从服务器获取到的信息为：", action.payload);
    });
  }
});
export default userSlice.reducer;
export const { setUsername, setP } = userSlice.actions;
