import { createAsyncThunk } from '@reduxjs/toolkit';
import firebaseConfig from '../../authBase';
import {
  getAuth,
} from 'firebase/auth';

const auth = getAuth(firebaseConfig);

export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile?username=' + 
  email);
  return response.json()
})

export const createUser = createAsyncThunk('user/createUser', async(params) => {
  const {username, password} = params;
  console.log("2", username, password);
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password})
  };
  const response = await fetch('http://52.62.135.159:8000/api/v1/users', requestOptions)
  return response.json()
})

export const fetchEvents = createAsyncThunk('event/fetchEvents', async (params) => {
  const requestOptions = {
    method: 'GET',
    // body: JSON.stringify({})
  };
  const response = await fetch('http://52.62.135.159:8000/api/v1/events', requestOptions)
  return response.json()
})
