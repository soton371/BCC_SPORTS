'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { clearAllItems, updateLoungeBooking } from '@/lib/redux/slice/bookFormSlice';
import { RootState } from '@/lib/redux/store';
import ServiceAndPriceShowing from './ServiceAndPriceShowing';
import { ServicePricing } from '@/app/(public)/(home)/_component/hero/hero';
import CommonBtn from './CommonBtn';
import { showToast } from '../toast-utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle, Trash2 } from 'lucide-react';
// Define schema (remains the same)
export const serviceSchema = z.object({
  total_travelers: z.number().min(1, 'At least one traveler is required'),
});

// Type inferred from schema (remains the same)
type ServiceFormData = z.infer<typeof serviceSchema>;

const LoungeBook = ({ data }: { data: ServicePricing | undefined }) => {
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
      <div className='mt-5 grid grid-cols-2 gap-4'>
        <ServiceAndPriceShowing
          category_name='Lounge Access'
          discount_price={data?.discount_price || 0}
          regular_price={data?.regular_price || 0}
        />

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
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-1 min-w-[320px]  max-w-[800px] bg-[var(--color-card)] rounded-2xl flex flex-col'
        >
          <div className='grid grid-cols-2'>
            <div className=''>
              <label className='block mb-2 font-medium'>Total Travelers</label>
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
          <CommonBtn disabled={isArrival} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoungeBook;
