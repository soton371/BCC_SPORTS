// import { FieldError, useFormContext } from 'react-hook-form';
// import Image from 'next/image';
// import { Dispatch } from '@reduxjs/toolkit';
// import { useEffect } from 'react';

// const ChosePaymentMethod = ({ setPaymentMethod }: { setPaymentMethod: any }) => {
//   const { register, watch, formState, setValue } = useFormContext<any>();
//   const selectedPayment = watch('payment_method');

//   useEffect(() => {
//     if (selectedPayment) setPaymentMethod(selectedPayment);
//   }, [selectedPayment]);
//   const error = formState?.errors?.payment_method as FieldError | undefined;
//   return (
//     <div className='flex flex-col items-end gap-2'>
//       <span className='font-medium mb-2'>Payment method:</span>

//       <div className='flex gap-4 justify-between'>
//         <label
//           className={`flex items-center gap-2 cursor-pointer ${selectedPayment === 'bkash' ? 'font-semibold' : ''}`}
//         >
//           <input
//             type='radio'
//             value='bkash'
//             {...register('payment_method', { required: true })}
//             name='payment_method' // ✅ important
//             className='accent-blue-600'
//           />
//           <Image alt='Bkash' width={60} height={20} src='/images/bkash.png' />
//         </label>

//         <label
//           className={`flex items-center gap-2 cursor-pointer ${selectedPayment === 'ssl' ? 'font-semibold' : ''}`}
//         >
//           <input
//             type='radio'
//             value='ssl'
//             {...register('payment_method', { required: true })}
//             name='payment_method' // ✅ important
//             className='accent-blue-600'
//           />
//           <Image alt='SSL Commerz' width={100} height={32} src='/images/sslcommaerz.png' />
//         </label>
//       </div>

//       {error?.message && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
//     </div>
//   );
// };

// export default ChosePaymentMethod;
'use client';

import { type FieldError, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { useEffect } from 'react';
import { Check } from 'lucide-react';

const ChosePaymentMethod = ({ setPaymentMethod }: { setPaymentMethod: any }) => {
  const { register, watch, formState, setValue } = useFormContext<any>();
  const selectedPayment = watch('payment_method');

  useEffect(() => {
    if (selectedPayment) setPaymentMethod(selectedPayment);
  }, [selectedPayment]);

  const error = formState?.errors?.payment_method as FieldError | undefined;

  return (
    <div className='flex flex-col gap-2 w-full bg-muted/30 border border-border p-3 rounded-md'>
      <div className='flex items-center justify-between'>
        <span className='text-lg font-semibold text-foreground leading-[18px]'>Payment Method</span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 '>
        {/* Bkash Payment Option */}
        <label
          className={`
            relative flex items-center justify-center gap-3 rounded-md border-2 
            cursor-pointer transition-all duration-200 bg-card
            ${
              selectedPayment === 'bkash'
                ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            }
          `}
        >
          <input
            type='radio'
            value='bkash'
            {...register('payment_method', { required: 'Please select a payment method' })}
            name='payment_method'
            className='sr-only'
          />

          {/* Selected Indicator */}
          {selectedPayment === 'bkash' && (
            <div className='absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
              <Check className='w-4 h-4 text-primary-foreground' />
            </div>
          )}

          <div className='flex items-center justify-center'>
            <Image
              alt='Bkash'
              width={80}
              height={28}
              src='/images/Bkash.png'
              className='object-contain'
            />
          </div>
        </label>

        {/* SSL Commerz Payment Option */}
        <label
          className={`
            relative flex items-center justify-center gap-3 rounded-md border-2 
            cursor-pointer transition-all duration-200 bg-card
            ${
              selectedPayment === 'ssl'
                ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            }
          `}
        >
          <input
            type='radio'
            value='ssl'
            {...register('payment_method', { required: 'Please select a payment method' })}
            name='payment_method'
            className='sr-only'
          />

          {/* Selected Indicator */}
          {selectedPayment === 'ssl' && (
            <div className='absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center'>
              <Check className='w-4 h-4 text-primary-foreground' />
            </div>
          )}

          <div className='flex items-center justify-center'>
            <Image
              alt='SSL Commerz'
              width={190}
              height={45}
              src='/images/sslcommaerz.png'
              className='object-contain'
            />
          </div>
        </label>
      </div>
      {error?.message && <p className='text-destructive text-sm'>{error.message}</p>}
    </div>
  );
};

export default ChosePaymentMethod;
