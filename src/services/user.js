import { baseUserApi } from './api';

export const userApi = baseUserApi.injectEndpoints({
  endpoints: (builder) => ({
    usersGet: builder.query({
      query: () => '/api/v1/demo',
    }),
  }),
  overrideExisting: true
});

export const { useGetUserQuery } = userApi;
