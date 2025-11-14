import React from 'react';
import {
  CustomTimePicker,
  CustomTimePickerForMobile,
  FormInput,
  FormInputForMobile,
} from '../form-items';
import { useFormContext } from 'react-hook-form';

const CommonFieldsForMobile = ({ form }: any) => {
  const { watch } = useFormContext();
  const isItArrival = watch('service_type');

  return (
    <div className='grid grid-cols-2 gap-1'>
      {/* Column 1 */}
      <div className='bg-gray-100 rounded-md shadow-sm border border-gray-300 p-1 flex flex-col gap-y-1'>
        <h3 className='font-semibold text-xs text-center lin text-transparent bg-clip-text bg-gradient-to-r from-[#12293F] to-[#1a3b5d]'>
          Flight Info
        </h3>
        <FormInputForMobile
          name='flight_number'
          type='text'
          label={<span className='text-[9px]'>Flight Number</span>}
          placeholder='Enter your flight number'
          className='border rounded-lg focus:ring-[#12293F] focus:border-[#12293F]'
        />

        <CustomTimePickerForMobile
          label={
            <span className='text-[9px]'>
              {isItArrival === 'Arrival'
                ? 'Arrival Time'
                : isItArrival === 'Departure'
                  ? 'Departure Time'
                  : 'Flight Time'}
            </span>
          }
          name='flight_time'
        />
        <CustomTimePickerForMobile
          label={<span className='text-[9px]'>Reporting Time</span>}
          name='reporting_time'
        />
      </div>

      {/* Column 2 */}
      <div className='bg-gray-100 rounded-md shadow-sm border border-gray-300 p-1 flex flex-col gap-y-1'>
        <h3 className='font-semibold text-xs text-center lin text-transparent bg-clip-text bg-gradient-to-r from-[#12293F] to-[#1a3b5d]'>
          Contact Info
        </h3>
        <FormInputForMobile
          label={<span className='text-[9px] mb-[px]'>Contact Phone</span>}
          name='contact_phone'
          placeholder='Enter your phone'
        />
        <FormInputForMobile
          label={<span className='text-[9px]'>Contact Email</span>}
          name='contact_email'
          placeholder='Enter your email'
        />
      </div>
    </div>
  );
};

export default CommonFieldsForMobile;
