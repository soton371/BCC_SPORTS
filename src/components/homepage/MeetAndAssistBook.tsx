'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { clearAllItems, updateMeetAndAssistForm } from '@/lib/redux/slice/bookFormSlice';
import { MeetAndAssistCategory } from '@/app/(public)/(home)/_component/hero/hero';
import CommonBtn from './CommonBtn';
import { showToast } from '../toast-utils';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { AlertTriangle, Info, Trash2 } from 'lucide-react';
import { Alert, AlertTitle } from '../ui/alert';

// Define schema
const serviceSchema = z.object({
  total_travelers: z.number().min(1, 'At least one traveler is required'),
  service_type: z.string().nonempty('Service type required'),
  category_id: z.string().nonempty('Category required'),
});

// Type inferred from schema
type ServiceFormData = z.infer<typeof serviceSchema>;

const MeetAndAssistBook = ({ data }: { data: MeetAndAssistCategory[] | undefined }) => {
  const dispatch = useDispatch();
  const initialFormState = useSelector((state: RootState) => state.bookForm.meetAndAssistBooking);
  const loungeBooking = useSelector((state: RootState) => state.bookForm.loungeBooking);
  const baggageBooking = useSelector((state: RootState) => state.bookForm.baggageBooking);
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

  const isLoungeBook = loungeBooking.isBook === 'yes' && isArrival;
  const isLuggageBook = baggageBooking.isBook === 'yes' && isArrival;
  return (
    <div>
      {/* <CopyInformation data1={loungeFormState} data2={baggageFormState} form={form} /> */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-1 min-w-[320px] max-w-[800px] bg-[var(--color-card)] rounded-2xl flex flex-col'
        >
          <div className='flex justify-between gap-2 w-full mt-3'>
            {/* Arrival */}
            <label className='flex items-center gap-2 flex-1 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
              <input
                type='radio'
                value='Arrival'
                {...form.register('service_type')}
                defaultChecked={form.getValues('service_type') === 'Arrival'}
                onChange={(e) => {
                  if (!e.target.value) return; // ignore empty or null
                  form.setValue('service_type', e.target.value, {
                    shouldValidate: true, // run Zod validation immediately
                    shouldDirty: true, // mark as dirty
                  });
                }}
                className='w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0'
              />

              <Image alt='' src={'/images/arrival.png'} width={20} height={20} />

              <span className='text-sm font-medium text-gray-700'>Arrival</span>
            </label>

            {/* Departure */}
            <label className='flex items-center gap-2 flex-1 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
              <input
                type='radio'
                value='Departure'
                {...form.register('service_type')}
                defaultChecked={form.getValues('service_type') === 'Departure'}
                onChange={(e: any) => {
                  form.setValue('service_type', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className='w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0'
              />
              <Image alt='' src={'/images/departure.png'} width={20} height={20} />
              <span className='text-sm font-medium text-gray-700'>Departure</span>
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
          <div className='my-2'>
            <label className='block mb-1 font-semibold'>
              Service Category
              {form.formState.errors.category_id && (
                <span className='text-red-500 text-xs pl-2'>
                  {form.formState.errors.category_id.message}.
                </span>
              )}
              <div className='pt-1  relative'>
                <div className='grid grid-cols-2 gap-2'>
                  {data?.map((category) => (
                    <div key={category.category_id}>
                      <label className='flex flex-1 items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
                        <input
                          type='radio'
                          value={String(category.category_id)}
                          {...form.register('category_id')}
                          defaultChecked={
                            (form.getValues('category_id') &&
                              String(category.category_id) ===
                                String(form.getValues('category_id'))) ||
                            false
                          }
                          onChange={(e) => {
                            if (!e.target.value) return;
                            form.setValue('category_id', e.target.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }}
                          className='w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0'
                        />

                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between gap-2'>
                            <span className='text-sm font-medium text-gray-900 leading-tight truncate'>
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

                          {category.discount_price &&
                            category.discount_price < category.regular_price && (
                              <div className='mt-0.5 text-xs text-green-600 leading-tight'>
                                Save ৳{category.regular_price - category.discount_price} /person
                              </div>
                            )}

                          {/* Tooltip Placement */}
                          <div className='-pt-[3px] flex justify-end'>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className='h-5 w-5 cursor-pointer text-gray-600' />
                              </TooltipTrigger>
                              <TooltipContent className='w-[200px] whitespace-normal'>
                                <p>{category?.category_features}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}

                  {isBaggageAndLuggage && (
                    <div className='w-full space-y-2'>
                      <Alert className='bg-amber-50 border-amber-400 text-amber-800'>
                        <AlertTriangle className='h-5 w-5' />
                        <div>
                          <AlertTitle className='font-semibold'>Notice</AlertTitle>
                          <div className='mt-1 text-sm'>
                            You can’t select{' '}
                            <span className='font-medium'>Meet and Assist (Arrival)</span> together
                            with{' '}
                            {isLoungeBook && isLuggageBook ? (
                              <>
                                <span className='font-medium'>Lounge</span> or{' '}
                                <span className='font-medium'>Baggage Wrapping</span>.
                              </>
                            ) : isLoungeBook ? (
                              <span className='font-medium'>Lounge.</span>
                            ) : (
                              <span className='font-medium'>Baggage Wrapping.</span>
                            )}
                          </div>

                          <div className='mt-2' onClick={() => dispatch(clearAllItems())}>
                            <button
                              type='button'
                              className=' cursor-pointer flex text-xs gap-0.5 bg-amber-50 border px-2 rounded-sm border-amber-400 text-amber-800'
                            >
                              <Trash2 className='h-4 w-3' />
                              Remove all items
                            </button>
                          </div>
                        </div>
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className='grid grid-cols-2'>
            <div className=''>
              <label className='block mb-1 font-semibold'>Total Travelers</label>
              <div className='flex items-center border rounded-lg max-w-[370px] overflow-hidden'>
                <button
                  type='button'
                  onClick={() =>
                    form.setValue(
                      'total_travelers',
                      Math.max(1, (form.getValues('total_travelers') || 1) - 1),
                    )
                  }
                  className='cursor-pointer w-9 h-9 flex items-center justify-center bg-[var(--color-muted)] text-lg'
                >
                  –
                </button>
                <span className='flex-1 text-center'>{form.watch('total_travelers') || 1}</span>
                <button
                  type='button'
                  onClick={() =>
                    form.setValue('total_travelers', (form.getValues('total_travelers') || 0) + 1)
                  }
                  className='cursor-pointer w-9 h-9 flex items-center justify-center bg-[var(--color-muted)] text-lg'
                >
                  +
                </button>
              </div>
              {form.formState.errors.total_travelers && (
                <p className='text-red-500 text-xs'>
                  {form.formState.errors.total_travelers?.message}
                </p>
              )}
            </div>

            <div className=''></div>
          </div>

          <CommonBtn disabled={isBaggageAndLuggage} />
        </form>
      </FormProvider>
    </div>
  );
};

export default MeetAndAssistBook;
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
