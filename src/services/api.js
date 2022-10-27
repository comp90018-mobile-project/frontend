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
  const {email, hostevent} = params
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      event_hosted: hostevent
    })
  }
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile?email=' +
  email, requestOptions);
  return response.json()
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

