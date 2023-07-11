import { apiSlice } from './apiSlice';

const VIDEO_URL = '/api/video';

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: `${VIDEO_URL}/getVideo`,
        method: 'GET'
      }),
    }),
  }),
});

export const {
  useGetVideosQuery,
} = videoApiSlice;
