import { createAsyncThunk } from '@reduxjs/toolkit';
import firebaseConfig from '../../authBase';
import {
  getAuth,
} from 'firebase/auth';
import { async } from '@firebase/util';

const auth = getAuth(firebaseConfig);

export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile?email=' +
  email);
  return response.json()
})

export const createUser = createAsyncThunk('user/createUser', async(params) => {
  const {username, password, email} = params;
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password, email: email})
  };
  const response = await fetch('http://52.62.135.159:8000/api/v1/users', requestOptions)
  return response.json()
})

export const updateUserHost = createAsyncThunk('user/updateUser', async(params) => {
  // hostevent: new events hosted by user
  const {email, hostevent} = params
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      query: {
        event_hosted: hostevent
      }
    })
  }
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile', requestOptions);
  return hostevent
  // return response.json()
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
      email: email,
      query: {
        push_token: token
      }
    })
  }
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile', requestOptions);
  return token
})

export const updateCovidStatus = createAsyncThunk('user/push', async(params) => {
  const { email, status } = params
  console.log("? e, s", email, status)
  let requestOptions
  let response;
  let url;
  if (status == "positive") {
    requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      })
    }
    url = 'http://52.62.135.159:8000/api/v1/users/push'
  } else {
    requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        query: {
          health_status: status
        }
      })
    }
    url = 'http://52.62.135.159:8000/api/v1/users/profile'
  }
  
  response = await fetch(url, requestOptions);
  return status
})

// Events
export const fetchEvents = createAsyncThunk('event/fetchEvents', async (params) => {
  const requestOptions = {
    method: 'GET',
    // body: JSON.stringify({})
  };
  const response = await fetch('http://52.62.135.159:8000/api/v1/events', requestOptions)
  return response.json()
})

export const createEvent = createAsyncThunk('event/createEvent', async(params) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(params)
  };
  const response = await fetch('http://52.62.135.159:8000/api/v1/events', requestOptions)
  return response.json()
})

