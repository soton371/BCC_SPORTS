'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import React, { useMemo, useState, useEffect } from 'react';
import { showToast } from '@/components/toast-utils';
import TotalTravelerFormField from './TotalTravelerFormField';

import z from 'zod';
import ServiceCart from './ServiceCart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import {
  useCallbikashPayMutation,
  useCallSSLPayMutation,
  useCreateOrderMutation,
} from '@/lib/APIs/common-api';
import { useSession } from 'next-auth/react';
import TopUpModal from '@/components/top-up-modal';
import UserUnAuthenticate from '@/components/UserUnAuthenticate';
import {
  resetBaggageForm,
  resetLoungeBooking,
  resetMeetAndAssistForm,
} from '@/lib/redux/slice/bookFormSlice';
import CommonFields from '@/components/homepage/CommonFields';
import Loading from '@/components/loading';

const travelerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  passport_number: z.string().optional(),
});
const serviceSchema = z.object({
  serviceName: z.string(),
  travelers: z.array(travelerSchema),
});

export const mainFormSchema = z.object({
  services: z.array(serviceSchema),
  flight_number: z.string().nonempty('Flight number required'),
  flight_time: z.string().nonempty('Flight time required'),
  reporting_time: z.string().nonempty('Flight time required'),
  contact_email: z
    .string()
    .email('Valid email required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Must be a valid email address without spaces'),

  contact_phone: z
    .string()
    .length(11, 'Phone number must be exactly 11 digits')
    .regex(/^01\d{9}$/, 'Phone number must start with 01 and be numeric'),

  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept Terms & Conditions' }),
  }),
  payment_method: z.enum(['bkash', 'ssl'], {
    errorMap: () => ({ message: 'You must select a payment method' }),
  }),
});

export type IMainForm = z.infer<typeof mainFormSchema>;

interface Props {
  serviceConfigs?: { serviceName: string; travelerCount: number; title?: string }[] | [];
}

const MultiServiceTravelerForm = ({ serviceConfigs = [] }: Props) => {
  const [payment_method, setPaymentMethod] = useState('');
  // const { register, watch, formState } = useFormContext<any>();
  // const selectedPayment = watch('payment_method');

  const [open, setOpen] = useState(false);
  const authCheck = useSession();
  const dispatch = useDispatch();
  const [crateOrder, { isLoading }] = useCreateOrderMutation();
  const [callSSL, { isLoading: isLoadssl, isSuccess }] = useCallSSLPayMutation();
  const [callBikash, { isLoading: isLoadBikash, isSuccess: isBikashSuc }] =
    useCallbikashPayMutation();
  const meetAndAssistFormState = useSelector(
    (state: RootState) => state.bookForm.meetAndAssistBooking,
  );
  const loungeFormState = useSelector((state: RootState) => state.bookForm.loungeBooking);
  const baggageFormState = useSelector((state: RootState) => state.bookForm.baggageBooking);

  // useForm with a safe initial value (empty array). We'll reset when defaults arrive/ change.
  const form = useForm<IMainForm>({
    resolver: zodResolver(mainFormSchema),
    defaultValues: {
      services: [],
      flight_number: '',
      flight_time: '',
      reporting_time: '',
      contact_email: '',
      contact_phone: '',
    },
  });

  // build default values for each service (always an array)
  const defaultServices = useMemo(
    () =>
      (serviceConfigs || [])?.map((config) => ({
        serviceName: config.serviceName,
        //config.travelerCount  --this is dynamic form generate based on total travelers. now initial value is 1
        travelers: Array.from({ length: config.travelerCount }, () => ({
          name: '',
          passport_number: '',
        })),
      })),
    [serviceConfigs],
  );

  // When serviceConfigs changes (e.g. async load), reset the form so fields appear
  useEffect(() => {
    form.reset({ services: defaultServices });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultServices)]); // stringify to avoid deep compare problems

  const onSubmit = async (data: IMainForm) => {
    // ✅ Convert to object keyed by serviceName

    const flight_and_contact_details = {
      contact_email: data?.contact_email,
      contact_phone: data?.contact_phone,
      flight_number: data?.flight_number,
      flight_time: data?.flight_time,
      reporting_time: data?.reporting_time,
    };
    // check authentication
    if (authCheck.status === 'unauthenticated') {
      setOpen(true); // only show modal, don't redirect here
      return;
    }

    try {
      // Step 1: Collect travelers
      const meetAndAssistTravelers =
        data?.services
          .find((s) => s.serviceName === 'meet_and_assist_traveler')
          ?.travelers.map(({ passport_number, ...rest }) =>
            passport_number && passport_number.trim() !== ''
              ? { ...rest, passport_number }
              : { ...rest },
          ) || [];

      const loungeTravelers =
        data?.services
          .find((s) => s.serviceName === 'lounge_traveler')
          ?.travelers.map(({ passport_number, ...rest }) =>
            passport_number && passport_number.trim() !== ''
              ? { ...rest, passport_number }
              : { ...rest },
          ) || [];

      const sameTraveler =
        data?.services
          .find((s) => s.serviceName === 'same_traveler')
          ?.travelers.map(({ passport_number, ...rest }) =>
            passport_number && passport_number.trim() !== ''
              ? { ...rest, passport_number }
              : { ...rest },
          ) || [];
      const both_traveler =
        data?.services
          .find((s) => s.serviceName === 'both_traveler')
          ?.travelers.map(({ passport_number, ...rest }) =>
            passport_number && passport_number.trim() !== ''
              ? { ...rest, passport_number }
              : { ...rest },
          ) || [];

      // Step 2: Build formValue
      const formValue = {
        ...(baggageFormState && baggageFormState.isBook == 'yes'
          ? { baggage: { ...removeIsBook(baggageFormState), ...flight_and_contact_details } }
          : {}),
        ...(meetAndAssistFormState && meetAndAssistFormState.isBook === 'yes'
          ? {
              meet_and_assist: {
                ...removeIsBook(meetAndAssistFormState),
                ...flight_and_contact_details,
                travelers:
                  sameTraveler?.length > 0
                    ? sameTraveler
                    : [...both_traveler, ...meetAndAssistTravelers],
              },
            }
          : {}),
        ...(loungeFormState && loungeFormState.isBook === 'yes'
          ? {
              lounge: {
                ...removeIsBook(loungeFormState),
                ...flight_and_contact_details,
                travelers:
                  sameTraveler?.length > 0 ? sameTraveler : [...both_traveler, ...loungeTravelers],
              },
            }
          : {}),
      };

      // Step 3: Create order
      const orderRes = await crateOrder({
        ...formValue,
        payment_gateway: payment_method && payment_method === 'ssl' ? 'SSL' : 'BKASH',
      }).unwrap();
      showToast('success', 'Order created successfully! Redirecting to payment...');

      // Step 4: Call SSL Payment API with order response
      if (orderRes?.data?.invoice_id && orderRes?.data?.payment_gateway === 'SSL') {
        const sslPayload = {
          isMobile: false,
          invoice_id: orderRes?.data?.invoice_id,
        };

        const sslRes = await callSSL(sslPayload).unwrap();
        if (sslRes?.success && sslRes?.data?.redirect_url) {
          window.location.href = sslRes?.data?.redirect_url;
          return;
        } else {
          showToast('error', 'SSL Payment gateway did not return redirect URL.');
        }
      } else {
        showToast('error', 'Order response missing order_id.');
      }

      if (orderRes?.data?.invoice_id && orderRes?.data?.payment_gateway === 'BKASH') {
        const sslPayload = {
          isMobile: false,
          invoice_id: orderRes?.data?.invoice_id,
        };

        const sslRes = await callBikash(sslPayload).unwrap();
        if (sslRes?.success && sslRes?.data?.redirect_url) {
          window.location.href = sslRes?.data?.redirect_url;
          return;
        } else {
          showToast('error', 'BKASH Payment gateway did not return redirect URL.');
        }
      } else {
        showToast('error', 'Order response missing order_id.');
      }
    } catch (err: any) {
      showToast('error', err?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (isLoadssl || isLoadBikash) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />;
      </div>
    );
    // show spinner while redirecting
  }

  // 🔹 once SSL success, reset redux state
  if (isSuccess || isBikashSuc) {
    dispatch(resetLoungeBooking());
    dispatch(resetBaggageForm({}));
    dispatch(resetMeetAndAssistForm({}));
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />;
      </div>
    );
  }

  return (
    <>
      <FormProvider {...form}>
        {authCheck?.status === 'unauthenticated' && (
          <TopUpModal
            title='Unauthenticated User'
            open={open}
            onOpenChange={() => {
              setOpen(!open);
            }}
          >
            {' '}
            <UserUnAuthenticate redirectUrl='/cart' />{' '}
          </TopUpModal>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 p-4 lg:p-8 max-w-7xl mx-auto'
        >
          <ServiceCart loading={isLoading} setPaymentMethod={setPaymentMethod} />

          {(loungeFormState.isBook === 'yes' ||
            meetAndAssistFormState.isBook === 'yes' ||
            baggageFormState.isBook === 'yes') && (
            <div className=''>
              <div>
                <CommonFields />{' '}
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            {serviceConfigs?.length > 0 ? (
              serviceConfigs?.map((service, index) => (
                <div key={index}>
                  <h2 className='text-xl mb-2'>{service.title}</h2>
                  <TotalTravelerFormField serviceIndex={index} serviceName={service.serviceName} />
                </div>
              ))
            ) : (
              <div className='col-span-3 text-center py-8'></div>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default MultiServiceTravelerForm;

export function removeIsBook<T extends Record<string, any>>(data: T): Omit<T, 'isBook'> {
  // Destructure and exclude isBook
  const { isBook, ...rest } = data;
  return rest;
}
