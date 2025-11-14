import { baseApi } from '../redux/RTK_API';

export const CommonAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: `/b2c/profile`,
          method: 'PATCH',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    createOrder: builder.mutation({
      query: (body) => {
        return {
          url: `/b2c/order`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useUpdateProfileMutation, useCreateOrderMutation } = CommonAPI;
