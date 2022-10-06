import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('http://52.62.135.159:8000/api/v1/users/profile?username=ZIAWANG1')
  return response.json()
})


