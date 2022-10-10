import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, createUser } from '../services/api';
// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    u: '111',
    p: '222',
    avatar: "",
    nickname: ""
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
      // console.log("从服务器获取到的信息为：", action.payload);
      const { data } = {...action.payload}
      console.log(data);
      const {avatar, nickname} = data;
      state.avatar = avatar;
      state.nickname = nickname;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      const { data } = {...action.payload}
      console.log(data);
      const {avatar, nickname} = data;
      state.avatar = avatar;
      state.nickname = nickname;
    });
  }
});
export default userSlice.reducer;
export const { setUsername, setP } = userSlice.actions;
