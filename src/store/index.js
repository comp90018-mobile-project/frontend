import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from 'redux'
import { baseUserApi } from '../services/api';
import { userApi } from '../services/user';
const reducer = combineReducers({
  [baseUserApi.reducerPath]: baseUserApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseUserApi.middleware),
})

setupListeners(store.dispatch)
