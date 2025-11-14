'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { updateMeetAndAssistForm } from '@/lib/redux/slice/bookFormSlice';
import { MeetAndAssistCategory } from '@/app/(public)/(home)/_component/hero/hero';
import CommonBtn from '../CommonBtn';
import { showToast } from '../../toast-utils';
import Image from 'next/image';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
const serviceSchema = z.object({
  total_travelers: z.number().min(1, 'At least one traveler is required'),
  service_type: z.string().nonempty('Service type required'),
  category_id: z.string().nonempty('Category required'),
});

// Type inferred from schema
type ServiceFormData = z.infer<typeof serviceSchema>;

const MeetAndAssistMobileView = ({ data }: { data: MeetAndAssistCategory[] | undefined }) => {
  const dispatch = useDispatch();
  const loungeBooking = useSelector((state: RootState) => state.bookForm.loungeBooking);
  const baggageBooking = useSelector((state: RootState) => state.bookForm.baggageBooking);
  const initialFormState = useSelector((state: RootState) => state.bookForm.meetAndAssistBooking);
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      ...initialFormState,
      total_travelers: initialFormState.total_travelers > 1 ? initialFormState.total_travelers : 1,
      service_type: initialFormState?.service_type ?? '',
      category_id: initialFormState?.category_id ?? '',
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    dispatch(updateMeetAndAssistForm({ ...data, isBook: 'yes' }));
    showToast(
      'success',
      'Successfully saved! You can proceed to checkout page to complete your booking.',
    );
  };
  const isArrival = form.watch('service_type') === 'Arrival';
  const isBaggageAndLuggage =
    (loungeBooking.isBook === 'yes' || baggageBooking.isBook === 'yes') && isArrival;

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='
  flex-1 min-w-[320px] max-w-[800px] p-1 flex flex-col gap-2'
        >
          {/* ---------------- Service Type ---------------- */}
          <div className='pb-2 px-2 pt-1 bg-gray-100 rounded-md shadow-sm border border-gray-300'>
            <h3 className='font-semibold text-xs lin text-transparent bg-clip-text bg-gradient-to-r from-[#12293F] to-[#1a3b5d]'>
              Service Type
            </h3>
            <div className='flex justify-between gap-3 w-full'>
              {/* Arrival */}
              <label
                className={`flex items-center gap-2 flex-1 p-1 sm:p-3 h-7 border rounded-md cursor-pointer transition-all 
        ${form.getValues('service_type') === 'Arrival' ? 'border-[#12293F] bg-[#12293F]/5 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type='radio'
                  value='Arrival'
                  {...form.register('service_type')}
                  onChange={(e) =>
                    form.setValue('service_type', e.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className='w-3 h-3 text-[#12293F] border-gray-300 focus:ring-[#12293F]'
                />
                <Image alt='' src='/images/arrival.png' width={20} height={20} />
                <span
                  className={`${form.getValues('service_type') === 'Arrival' ? 'text-[#12293F]' : 'text-gray-700'}`}
                >
                  Arrival
                </span>
              </label>
              {/* Departure */}
              <label
                className={`flex items-center gap-2 flex-1 p-1 sm:p-3 h-7 border rounded-md cursor-pointer transition-all 
        ${form.getValues('service_type') === 'Departure' ? 'border-[#12293F] bg-[#12293F]/5 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type='radio'
                  value='Departure'
                  {...form.register('service_type')}
                  onChange={(e) =>
                    form.setValue('service_type', e.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className='w-3 h-3 text-[#12293F] border-gray-300 focus:ring-[#12293F]'
                />
                <Image alt='' src='/images/departure.png' width={20} height={20} />
                <span
                  className={`${form.getValues('service_type') === 'Departure' ? 'text-[#12293F]' : 'text-gray-700'}`}
                >
                  Departure
                </span>
              </label>
            </div>
            <label htmlFor=''>
              {' '}
              {form.formState.errors.service_type && (
                <span className='text-red-500 text-xs pl-2'>
                  {form.formState.errors.service_type.message}.
                </span>
              )}
            </label>
          </div>

          {isBaggageAndLuggage && (
            <div className='w-full'>
              <Alert className='bg-amber-50 border-amber-400 text-amber-800'>
                <AlertTriangle className='h-5 w-5' />
                <div>
                  <AlertTitle className='font-semibold'>Notice</AlertTitle>
                  <div className=' mt-1'>
                    You can’t select <span className='font-medium'>Meet and Assist (Arrival)</span>{' '}
                    together with
                    <span className='font-medium'> Lounge </span> or
                    <span className='font-medium'> Baggage Wrapping</span>.
                  </div>
                </div>
              </Alert>
            </div>
          )}

          {/* ---------------- Service Category ---------------- */}
          <div className='pb-2 px-2 pt-1 bg-gray-100 rounded-md shadow-sm border border-gray-300'>
            <h3 className='font-semibold text-xs lin text-transparent bg-clip-text bg-gradient-to-r from-[#12293F] to-[#1a3b5d]'>
              Service Category
            </h3>
            <div className='grid gap-1 grid-cols-1'>
              {data?.map((category) => (
                <label
                  key={category.category_id}
                  className='flex items-center gap-1 p-1 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 shadow-sm transition-colors'
                >
                  <input
                    type='radio'
                    value={String(category.category_id)}
                    {...form.register('category_id')}
                    onChange={(e) =>
                      form.setValue('category_id', e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className='w-3 h-3 text-[#12293F] border-gray-300 focus:ring-[#12293F]'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-900 truncate'>
                        {category.category_name}
                      </span>

                      <div className='flex items-center gap-1 flex-shrink-0'>
                        {category.discount_price &&
                        category.discount_price < category.regular_price ? (
                          <>
                            <span className='text-sm font-bold text-green-600'>
                              ৳{category.discount_price}
                            </span>
                            <span className='text-xs text-gray-500 line-through'>
                              ৳{category.regular_price}
                            </span>
                            <span className='px-1.5 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full'>
                              {Math.round(
                                ((category.regular_price - category.discount_price) /
                                  category.regular_price) *
                                  100,
                              )}
                              % OFF
                            </span>
                          </>
                        ) : (
                          <span className='text-sm font-semibold text-gray-900'>
                            ৳{category.regular_price}/person
                          </span>
                        )}
                      </div>
                    </div>
                    {category.discount_price && (
                      <span className='text-xs text-green-600'>
                        Save ৳{category.regular_price - category.discount_price}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <label className='block font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-900'>
              {form.formState.errors.category_id && (
                <span className='text-red-500 text-xs pl-2'>
                  {form.formState.errors.category_id.message}.
                </span>
              )}
            </label>
          </div>

          {/* ---------------- Common Fields ---------------- */}
          {/* <div className=''>
            <CommonFieldsForMobile />
          </div> */}

          {/* ---------------- Travelers ---------------- */}
          <div className='p-1 bg-gray-100 rounded-sm shadow-sm border border-gray-300'>
            <label className='block font-medium text-xs text-[#12293F]'>Total Travelers</label>
            <div className='flex items-center border rounded-lg overflow-hidden shadow-sm'>
              <button
                type='button'
                onClick={() =>
                  form.setValue(
                    'total_travelers',
                    Math.max(1, (form.getValues('total_travelers') || 1) - 1),
                  )
                }
                className='cursor-pointer w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg'
              >
                –
              </button>
              <span className='flex-1 text-center font-semibold text-[#12293F]'>
                {form.watch('total_travelers') || 1}
              </span>
              <button
                type='button'
                onClick={() =>
                  form.setValue('total_travelers', (form.getValues('total_travelers') || 0) + 1)
                }
                className='cursor-pointer w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg'
              >
                +
              </button>
            </div>
          </div>

          <CommonBtn disabled={isBaggageAndLuggage} />
        </form>
      </FormProvider>
    </div>
  );
};

export default MeetAndAssistMobileView;
