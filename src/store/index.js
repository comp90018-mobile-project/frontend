import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../slices/event';
import userReducer from '../slices/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
});
