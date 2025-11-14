import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

const TermsAndConditionAllow = () => {
  const { register, watch, setValue, formState } = useFormContext<any>();

  const error = formState?.errors?.terms as FieldError | undefined;
  return (
    <div className='flex items-end flex-col justify-end'>
      <div className='flex items-center justify-end'>
        <input
          type='checkbox'
          {...register('terms', { required: true })}
          onChange={(e: any) => {
            setValue('terms', e.target.checked, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
        />
        <label className='ml-2 text-sm text-gray-700'>
          I agree to the{' '}
          <a href='/terms-and-conditions' className='text-blue-600 underline'>
            Terms & Conditions
          </a>
        </label>
      </div>
      {error?.message && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
    </div>
  );
};

export default TermsAndConditionAllow;
