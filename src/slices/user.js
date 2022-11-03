import { createSlice } from '@reduxjs/toolkit';
import {
  createUser, fetchUser, updateCovidStatus, updateEventActive, updateUserAvatar, updateUserHost, updateUserParticipate, updateUserPushToken, updateUserQuitEvent
} from '../services/api';
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
    covid: '',
    token: '',
  },
  reducers: {
    setLogin: (state, action) => {
      state = action.payload;
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
      state.hostevent = action.payload;
    },
    setParticipantevent: (state, action) => {
      state.participantevent = action.payload;
    },
    setEventHistory: (state, action) => {
      state.eventhistory = action.payload;
    },
    setCovid: (state, action) => {
      state.covid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const { data } = { ...action.payload };
      console.log('Login user = ', data);
      const {
        username, avatar, email, event_hosted, event_history, event_participated, health_status,
      } = data;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.eventhistory = event_history;
      state.hostevent = event_hosted;
      state.participantevent = event_participated;
      state.covid = health_status;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      const { data } = { ...action.payload };
      const {
        username, avatar, email, event_hosted, event_history, event_participated, health_status,
      } = data;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.eventhistory = event_history;
      state.hostevent = event_hosted;
      state.participantevent = event_participated;
      state.covid = health_status;
      console.log('data', data);
    });
    builder.addCase(updateUserHost.fulfilled, (state, action) => {
      console.log('success update user host', data);
      state.hostevent = action.payload;
    });
    builder.addCase(updateUserParticipate.fulfilled, (state, action) => {
      console.log('success update user participate', data);
      state.participantevent = action.payload;
    });
    builder.addCase(updateUserAvatar, (state, action) => {
      console.log('success update user avatar', data);
      state.avatar = action.payload;
    });
    builder.addCase(updateUserPushToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(updateCovidStatus.fulfilled, (state, action) => {
      state.covid = action.payload;
    });
    builder.addCase(updateUserQuitEvent.fulfilled, (state, action) => {
      const { data } = { ...action.payload };
      console.log('data fetch from update quit: ', data);
      const {
        username, avatar, email, event_hosted, event_history, event_participated, health_status,
      } = data;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.eventhistory = event_history;
      state.hostevent = event_hosted;
      state.participantevent = event_participated;
      state.covid = health_status;
      console.log('after quit or cancel event', data);
    });
    builder.addCase(updateUserQuitEvent.rejected, () => {
      console.log('rejected');
    });
    builder.addCase(updateEventActive.fulfilled, (state, action) => {

    });
  },
});
export default userSlice.reducer;
export const {
  setUsername, setEmail, setAvatar, setHostEvent, setParticipantevent, setEventHistory, setCovid,
} = userSlice.actions;
