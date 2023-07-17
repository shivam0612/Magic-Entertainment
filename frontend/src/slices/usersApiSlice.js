import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    addSubscription: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/subscription`,
        method: 'POST',
        body: data,
      }),
    }),
    getSubscriptionDetails: builder.query({
      query: () => ({
        url: `${VIDEO_URL}/getsubscription`,
        method: 'GET'
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAddSubscriptionMutation,
  useGetSubscriptionDetailsQuery
} = userApiSlice;
