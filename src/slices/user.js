import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, createUser, updateUserHost } from '../services/api';
import { uploadImage } from '../utils/upload';
// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    avatar: '',
    hostevent: [],
    participantevent: [],
    eventhistory: [],
    covid: ''
  },
  reducers: {
    setLogin: (state, action) => {
      state = action.payload
    },
    setUsername: (state, action) => {
      state.u = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setHostEvent: (state, action) => {
      state.hostevent = action.payload
    },
    setParticipantevent: (state, action) => {
      state.participantevent = action.payload
    },
    setEventHistory: (state, action) => {
      state.eventhistory = action.payload
    },
    setCovid: (state, action) => {
      state.covid = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { data } = {...action.payload}
      console.log("Login user = ", data)
      const {username, avatar, email, event_hosted, event_history, event_participated, health_status} = data;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.eventhistory = event_history;
      state.hostevent = event_hosted;
      state.participantevent = event_participated;
      state.covid = health_status;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      const { data } = {...action.payload}
      const {username, avatar, email, event_hosted, event_history, event_participated, health_status} = data;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.eventhistory = event_history;
      state.hostevent = event_hosted;
      state.participantevent = event_participated;
      state.covid = health_status;
      console.log(data)
    });
    builder.addCase(updateUserHost.fulfilled, (state, action) => {
      // const { data } = {...action.payload}
      console.log('success', data)
      state.hostevent = action.payload
    });
    builder.addCase(updateUserHost.rejected, (state, action) => {
      const { data } = {...action.payload}
      console.log('fail update user host event', data)
    });


  }
});
export default userSlice.reducer;
export const { setUsername, setEmail, setAvatar, setHostEvent, setParticipantevent, setEventHistory, setCovid } = userSlice.actions;
