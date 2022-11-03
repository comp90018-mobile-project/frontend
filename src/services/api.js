import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuth
} from 'firebase/auth';
import firebaseConfig from '../../authBase';

const auth = getAuth(firebaseConfig);
const domain = "http://13.238.153.25:8000/api/v1/";

export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
  const response = await fetch(domain + 'users/profile?email=' +
  email);
  return response.json()
})

export const createUser = createAsyncThunk('user/createUser', async (params) => {
  const { username, password, email } = params;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  };
  const response = await fetch(domain + 'users', requestOptions)
  return response.json()
})

export const updateUserHost = createAsyncThunk('user/updateUserHost', async (params) => {
  // hostevent: new events hosted by user
  const { email, hostevent } = params;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      query: {
        event_hosted: hostevent
      }
    })
  }
  const response = await fetch(domain + 'users/profile', requestOptions);
  return hostevent
})

export const updateUserParticipate = createAsyncThunk('user/updateUserParticipate', async (params) => {
  // participant: new event participated by user
  const { email, participantevent } = params;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      query: {
        event_participated: participantevent
      }
    })
  }
  const response = await fetch(domain + 'users/profile', requestOptions);
  return response.json()
})

export const updateUserAvatar = createAsyncThunk('user/updateUserAvatr', async (params) => {
  const { email, avatar } = params;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      query: {
        avatar: avatar
      }
    })
  }
  // console.log("email: " + email + "avatar: " + avatar)
  const response = await fetch(domain + 'users/profile', requestOptions);
  const data = await response.json();
  console.log(data)
  return data;
})

// when cancel or quit event
export const updateUserQuitEvent = createAsyncThunk('user/updateUserEvent', async (email) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      query: {
        event_hosted: [],
        event_participated: []
      }
    })
  }
  const response = await fetch(domain + 'users/profile', requestOptions);
  return response.json()
})

/**
 * Update user's Expo Push Notification token
 */
export const updateUserPushToken = createAsyncThunk('user/updateToken', async(params) => {
  const { email, token } = params
  console.log("email: ", email, "token:", token)
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      query: {
        push_token: token
      }
    })
  }
  const response = await fetch(domain + 'users/profile', requestOptions);
  return token
})

export const updateCovidStatus = createAsyncThunk('user/push', async (params) => {
  const { email, status } = params;
  console.log('? e, s', email, status);
  let requestOptions;
  let response;
  let url;
  if (status == 'positive') {
    requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      })
    }
    url = domain + 'users/push'
  } else {
    requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        query: {
          health_status: status
        }
      })
    }
    url = domain + 'users/profile'
  }

  response = await fetch(url, requestOptions);
  return status;
});

// Events
export const fetchEvents = createAsyncThunk('event/fetchEvents', async (params) => {
  const requestOptions = {
    method: 'GET',
    // body: JSON.stringify({})
  };
  const response = await fetch(domain + 'events', requestOptions)
  return response.json()
})

export const createEvent = createAsyncThunk('event/createEvent', async (params) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(params),
  };
  const response = await fetch(domain + 'events', requestOptions)
  return response.json()
})

// fetch single event
export const fetchEvent = createAsyncThunk('event/fetchEvent', async(event_id) => {
  const response = await fetch(domain + 'events?event_id=' + event_id);
  return response.json()
})

// update event participants[]
export const updateEventParticipants = createAsyncThunk('event/updateEventParticipants', async (params) => {
  const { event_id, participants } = params;
  const requestOptions = {
    method: 'PATCH',
    body: JSON.stringify({
      event_id,
      query: {
        participants: participants,
      }
    })
  }
  const response = await fetch(domain + 'events', requestOptions)
  return params
})

// update event active status
export const updateEventActive = createAsyncThunk('event/updateEventActive', async (params) => {
  const { event_id, active } = params;
  const requestOptions = {
    method: 'PATCH',
    body: JSON.stringify({
      event_id,
      query: {
        active: active
      }
    })
  }
  const response = await fetch(domain + 'events', requestOptions)
  // return response.json()
  return params
})

export const cancelEvent = createAsyncThunk('event/cancelEvent', async (eventId) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      event_id: eventId
    })
  }
  await fetch(domain + 'events/delete', requestOptions)
  return eventId
})

export const getUsersAvatar = async(emailString) => {
  const response = await fetch(domain + 'users/avatars?email=' +
  emailString);
  return response.json()
}
