'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { clearAllItems, updateLoungeBooking } from '@/lib/redux/slice/bookFormSlice';
import { RootState } from '@/lib/redux/store';
import { ServicePricing } from '@/app/(public)/(home)/_component/hero/hero';
import { showToast } from '@/components/toast-utils';
import ServiceAndPriceShowing from '../ServiceAndPriceShowing';
import CommonBtn from '../CommonBtn';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Trash2 } from 'lucide-react';

// Define schema (remains the same)
export const serviceSchema = z.object({
  total_travelers: z.number().min(1, 'At least one traveler is required'),
});

// Type inferred from schema (remains the same)
type ServiceFormData = z.infer<typeof serviceSchema>;

const LoungeMobileView = ({ data }: { data: ServicePricing | undefined }) => {
  const dispatch = useDispatch();
  const meetAndAssist = useSelector((state: RootState) => state.bookForm.meetAndAssistBooking);
  const initialFormState = useSelector((state: RootState) => state.bookForm.loungeBooking);
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      ...initialFormState,
      total_travelers: initialFormState.total_travelers > 1 ? initialFormState.total_travelers : 1,
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    dispatch(updateLoungeBooking({ ...data, isBook: 'yes' }));
    showToast(
      'success',
      'Successfully saved! You can proceed to checkout page to complete your booking.',
    );
  };
  const isArrival = meetAndAssist.service_type === 'Arrival';
  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-1 min-w-[320px] max-w-[800px] bg-white rounded-2xl shadow-md p-2 flex flex-col gap-3'
        >
          <div className='pb-2 px-2 pt-1 bg-gray-100 rounded-md shadow-sm border border-gray-300'>
            <h3 className='font-semibold text-xs lin text-transparent bg-clip-text bg-gradient-to-r from-[#12293F] to-[#1a3b5d]'>
              Lounge Category{' '}
            </h3>
            <ServiceAndPriceShowing
              category_name='Lounge'
              discount_price={data?.discount_price || 0}
              regular_price={data?.regular_price || 0}
            />
          </div>
          {isArrival && (
            <div className='w-full'>
              <Alert className='bg-amber-50 h-[122px] border-amber-400 text-amber-800'>
                <AlertTriangle className='h-5 w-5' />
                <div>
                  <AlertTitle className='font-semibold'>Notice</AlertTitle>
                  Selecting <span className='font-medium'>Meet and Assist (Arrival)</span> and
                  <span className='font-medium'> Lounge </span> together is not allowed.
                  <div className='mt-2 w-[200px]' onClick={() => dispatch(clearAllItems())}>
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

          <div className='p-1 bg-gray-100 rounded-sm shadow-sm border border-gray-300'>
            <label className='block font-medium text-xs text-[#12293F]'>Total Travelers</label>
            <div className='flex items-center border rounded-md overflow-hidden shadow-sm'>
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

          <CommonBtn disabled={isArrival} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoungeMobileView;
