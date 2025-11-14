'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import MultiServiceTravelerForm from './MultiServiceTravelerForm';

const ServiceCartAndTravelerInfo: React.FC = () => {
  const meetAndAssistBooking = useSelector(
    (state: RootState) => state.bookForm.meetAndAssistBooking,
  );
  const loungeBooking = useSelector((state: RootState) => state.bookForm.loungeBooking);

  const meetCount = meetAndAssistBooking?.total_travelers ?? 0;
  const loungeCount = loungeBooking?.total_travelers ?? 0;
  const isSameTravelerCount = meetCount > 0 && loungeCount > 0 && meetCount === loungeCount;

  const biggerValue = Math.max(meetCount, loungeCount);
  const smallerValue = Math.min(meetCount, loungeCount); ///this value will be common
  const whichServiceValueBigger = biggerValue === meetCount; //if meet&assist bigger===true
  const uniqueFormCount = biggerValue - smallerValue; ///this unique traveler form

  const serviceConfigs = isSameTravelerCount
    ? [
        {
          title: `Total Traveler (${meetAndAssistBooking?.total_travelers})`,
          serviceName: 'same_traveler',
          travelerCount: meetAndAssistBooking.total_travelers,
        },
      ]
    : [
        ...(smallerValue
          ? [
              {
                title: `Both (Meet & Assist and Lounge Traveler)`,
                serviceName: 'both_traveler',
                travelerCount: smallerValue,
              },
            ]
          : []),
        ...(uniqueFormCount
          ? [
              {
                title: `${whichServiceValueBigger ? 'Meet & Assist Traveler' : 'Lounge Traveler'}`,
                serviceName: whichServiceValueBigger
                  ? 'meet_and_assist_traveler'
                  : 'lounge_traveler',
                travelerCount: uniqueFormCount,
              },
            ]
          : []),
      ];

  return (
    <div>
      <MultiServiceTravelerForm serviceConfigs={serviceConfigs} />
    </div>
  );
};

export default ServiceCartAndTravelerInfo;
