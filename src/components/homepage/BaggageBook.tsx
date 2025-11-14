'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { clearAllItems, updateBaggageForm } from '@/lib/redux/slice/bookFormSlice';
import ServiceAndPriceShowing from './ServiceAndPriceShowing';
import { ServicePricing } from '@/app/(public)/(home)/_component/hero/hero';
import CommonBtn from './CommonBtn';
import { showToast } from '../toast-utils';
import { Alert, AlertTitle } from '../ui/alert';
import { AlertTriangle, Trash2 } from 'lucide-react';

// Define schema
const serviceSchema = z.object({
  total_baggages: z.number().min(1, 'At least one Baggage is required'),
});

// Type inferred from schema
type ServiceFormData = z.infer<typeof serviceSchema>;

const BaggageBook = ({ data }: { data: ServicePricing | undefined }) => {
  const dispatch = useDispatch();
  const meetAndAssist = useSelector((state: RootState) => state.bookForm.meetAndAssistBooking);

  const initialFormState = useSelector((state: RootState) => state.bookForm.baggageBooking);
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      ...initialFormState,
      total_baggages: initialFormState.total_baggages > 1 ? initialFormState.total_baggages : 1,
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    dispatch(updateBaggageForm({ ...data, isBook: 'yes' }));
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
          category_name='Baggage Wrapping'
          regular_price={data?.regular_price || 0}
          discount_price={data?.discount_price || 0}
        />

        {isArrival && (
          <div className='w-full'>
            <Alert className='bg-amber-50 h-[122px] border-amber-400 text-amber-800'>
              <AlertTriangle className='h-5 w-5' />
              <div>
                <AlertTitle className='font-semibold'>Notice</AlertTitle>
                Selecting <span className='font-medium'>Meet and Assist (Arrival)</span> and
                <span className='font-medium'> Luggage Wrapping </span> together is not allowed.
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
          className='flex-1 min-w-[320px] max-w-[800px] bg-[var(--color-card)] rounded-2xl flex flex-col'
        >
          {/* <CommonFields /> */}

          <div className='grid grid-cols-2'>
            <div className=''>
              <label className='block mb-2 font-medium'>Total Luggage</label>
              <div className='flex items-center border rounded-lg max-w-[370px] overflow-hidden'>
                <button
                  type='button'
                  onClick={() =>
                    form.setValue(
                      'total_baggages',
                      Math.max(1, (form.getValues('total_baggages') || 1) - 1),
                    )
                  }
                  className='cursor-pointer w-9 h-9 flex items-center justify-center bg-[var(--color-muted)] text-lg'
                >
                  –
                </button>
                <span className='flex-1 text-center'>{form.watch('total_baggages') || 0}</span>
                <button
                  type='button'
                  onClick={() =>
                    form.setValue('total_baggages', (form.getValues('total_baggages') || 0) + 1)
                  }
                  className='cursor-pointer w-9 h-9 flex items-center justify-center bg-[var(--color-muted)] text-lg'
                >
                  +
                </button>
              </div>
              {form.formState.errors.total_baggages && (
                <p className='text-red-500 text-xs'>
                  {form.formState.errors.total_baggages?.message}
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

export default BaggageBook;
