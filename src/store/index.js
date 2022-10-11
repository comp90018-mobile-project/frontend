import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../slices/user";
import eventReducer from "../slices/event";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer
  }
});

