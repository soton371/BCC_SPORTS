import React, { useEffect } from 'react';
import { CustomTimePicker, FormInput } from '../form-items';
import { useFormContext } from 'react-hook-form';
import { Card } from '../ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { subHours, parseISO, format } from 'date-fns';

const CommonFields = ({ form }: any) => {
  const meetAndAssist = useSelector((state: RootState) => state.bookForm.meetAndAssistBooking);
  const isArrival = meetAndAssist.service_type === 'Arrival';
  const { watch, setValue } = useFormContext();
  const flight_time = watch('flight_time');

  // Update reporting_time whenever flight_time changes
  useEffect(() => {
    if (flight_time) {
      let reportingTime: Date;
      const parsedFlightTime =
        typeof flight_time === 'string' ? parseISO(flight_time) : flight_time;

      if (isArrival) {
        reportingTime = parsedFlightTime; // For Arrival, reporting time = flight time
      } else {
        reportingTime = subHours(parsedFlightTime, 4); // For Departure, reporting time = 4 hours before flight
      }

      // Set reporting_time in the form
      setValue('reporting_time', format(reportingTime, "yyyy-MM-dd'T'HH:mm:ssxxx"), {
        shouldValidate: true, // run Zod validation
        shouldDirty: true, // mark as dirty
      });
    }
  }, [flight_time, isArrival, setValue]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 py-3 w-full'>
      <Card className='px-2'>
        <FormInput
          name='flight_number'
          type='text'
          label='Flight Number'
          placeholder='Enter your flight number'
          className='border rounded-lg focus:ring-[#12293F] focus:border-[#12293F]'
        />
        <CustomTimePicker
          label={`${isArrival ? 'Arrival Time' : 'Departure Time'}`}
          name='flight_time'
        />
        <CustomTimePicker label='Reporting Time' name='reporting_time' />
      </Card>
      <Card className='px-2'>
        <FormInput
          type='email'
          placeholder='Enter your contact email'
          label='Contact Email'
          name='contact_email'
        />
        <FormInput
          type='tel'
          placeholder='Enter your contact phone'
          label='Contact Phone'
          name='contact_phone'
        />
      </Card>
    </div>
  );
};

export default CommonFields;
