import { ILoginOtpSchema } from '@/app/(public)/(auth)/_components/login-otp';
import { ISignupSchema } from '@/app/(public)/(auth)/_components/sign-up-page';
import { IPaymentMethod } from '@/app/(public)/payment-method/page';
import { HTTPResponse, ILoginResponse, IMatchOTPResponse, IMyProfileRes } from '@/type/type';
import { IUserCreatedResponse } from '@/type/user/user.interface';
import { formatQueryParams } from '../helper';
import { baseApi } from '../redux/RTK_API';
import { API_ENDPOINTS } from './endpoint-list';
import { TAllServices } from '@/app/(public)/(home)/_component/hero/hero';
import { BookingForm, IBikashType, IOrderList } from '@/app/(public)/cart/_type/order';
import {
  BaggageOrder,
  BaggageOrderDetails,
  InvoiceDetails,
  LoungeOrder,
  LoungeOrderDetails,
  MeetAndAssistOrderDetails,
  MeetAssistOrder,
} from '@/app/(private)/(profile)/my-account/order-list/_type/orderlist';

export const CommonAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => {
        return {
          url: `/b2c/profile`,
          method: 'PATCH',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    getProfile: builder.query<HTTPResponse<IMyProfileRes>, { name?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.PROFILE}`,
          method: 'GET',
        };
      },

      providesTags: ['PROFILE_UPDATE'],
    }),
    changePassword: builder.mutation<
      HTTPResponse<void>,
      { old_password: string; new_password: string }
    >({
      query: (body) => {
        return {
          url: `/b2c/profile/change-password`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    signUpAccount: builder.mutation<IUserCreatedResponse<{ id: number }>, ISignupSchema>({
      query: (body) => {
        return {
          url: `/auth/b2c/register`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    checkTokenAccount: builder.mutation<ILoginResponse, { token?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.REGISTER_COMPLETE}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    sendOTP: builder.mutation<
      HTTPResponse<{
        remaining_retry_time: number;
      }>,
      { type?: 'reset_b2c'; email: string }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.SEND_OTP}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    matchOTP: builder.mutation<
      IMatchOTPResponse,
      {
        type: 'reset_b2c';
        email: string;
        otp: string;
      }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.MATCH_OTP}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    resetPassword: builder.mutation<
      HTTPResponse<void>,
      {
        email: string;
        token: string;
        password: string;
      }
    >({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.RESET_PASSWORD}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    twoFALogin: builder.mutation<HTTPResponse<void>, ILoginOtpSchema>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.TWO_FA_LOGIN}`,
          method: 'POST',
          body: body,
        };
      },

      invalidatesTags: ['PROFILE_UPDATE'],
    }),

    subsEmail: builder.mutation<HTTPResponse<void>, { email?: string }>({
      query: (body) => {
        return {
          url: `${API_ENDPOINTS.PROFILE}`,
          method: 'POST',
          body: body,
        };
      },
    }),
    paymentMethod: builder.query<HTTPResponse<IPaymentMethod[]>, { name?: string }>({
      query: (arg) => {
        const url = formatQueryParams(API_ENDPOINTS.PAYMENT_METHOD, { ...arg, skip: 0, limit: 20 });
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    getAvailableServices: builder.query<HTTPResponse<TAllServices>, void>({
      query: (arg) => {
        return {
          url: `/public/b2c/available-services`,
          method: 'GET',
        };
      },
    }),
    getMeetAndAssistOrder: builder.query<HTTPResponse<MeetAssistOrder[]>, void>({
      query: (arg) => {
        return {
          url: `/b2c/meet-and-assist-order`,
          method: 'GET',
        };
      },
    }),
    getLoungeOrder: builder.query<HTTPResponse<LoungeOrder[]>, void>({
      query: (arg) => {
        return {
          url: `/b2c/lounge-order`,
          method: 'GET',
        };
      },
    }),

    getBaggaeWrappingOrder: builder.query<HTTPResponse<BaggageOrder[]>, void>({
      query: (arg) => {
        return {
          url: `/b2c/baggage-wrapping-order`,
          method: 'GET',
        };
      },
    }),
    createOrder: builder.mutation<HTTPResponse<IOrderList>, BookingForm>({
      query: (body) => {
        return {
          url: `/b2c/order`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [],
    }),
    callSSLPay: builder.mutation<HTTPResponse<{ redirect_url: string }>, IOrderList>({
      query: (body) => {
        return {
          url: `/b2c/payment/ssl-pay`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [],
    }),
    callbikashPay: builder.mutation<HTTPResponse<{ redirect_url: string }>, IBikashType>({
      query: (body) => {
        return {
          url: `/b2c/payment/bkash-pay`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [],
    }),

    /* order details----------------------------- */
    getMeetAndAssistOrderDetails: builder.query<HTTPResponse<MeetAndAssistOrderDetails>, string>({
      query: (id) => {
        return {
          url: `/b2c/meet-and-assist-order/${id}`,
          method: 'GET',
        };
      },

      providesTags: ['ORDER-LIST'],
    }),
    getInvoiceOrderDetails: builder.query<HTTPResponse<InvoiceDetails>, string>({
      query: (id) => {
        return {
          url: `/b2c/order/invoice/${id}`,
          method: 'GET',
        };
      },

      providesTags: ['ORDER-LIST'],
    }),
    getLoungeOrderDetails: builder.query<HTTPResponse<LoungeOrderDetails>, string>({
      query: (id) => {
        return {
          url: `/b2c/lounge-order/${id}`,
          method: 'GET',
        };
      },

      providesTags: ['ORDER-LIST'],
    }),
    getBaggageOrderDetails: builder.query<HTTPResponse<BaggageOrderDetails>, string>({
      query: (id) => {
        return {
          url: `/b2c/baggage-wrapping-order/${id}`,
          method: 'GET',
        };
      },

      providesTags: ['ORDER-LIST'],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useSignUpAccountMutation,
  useCheckTokenAccountMutation,
  useSendOTPMutation,
  useMatchOTPMutation,
  useResetPasswordMutation,
  useTwoFALoginMutation,
  useSubsEmailMutation,
  usePaymentMethodQuery,
  useGetAvailableServicesQuery,
  useCallSSLPayMutation,
  useCallbikashPayMutation,
  useCreateOrderMutation,
  useGetBaggaeWrappingOrderQuery,
  useGetLoungeOrderQuery,
  useGetMeetAndAssistOrderQuery,
  useGetMeetAndAssistOrderDetailsQuery,
  useGetBaggageOrderDetailsQuery,
  useGetLoungeOrderDetailsQuery,
  useGetInvoiceOrderDetailsQuery,
  useLazyGetInvoiceOrderDetailsQuery,
} = CommonAPI;
