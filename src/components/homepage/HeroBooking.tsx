'use client';

import React, { useState } from 'react';
import MeetAndAssistBook from './MeetAndAssistBook';
import BaggageBook from './BaggageBook';
import LoungeBook from './LoungeBook';
import { ServiceData } from '@/app/(public)/(home)/_component/hero/hero';
import Image from 'next/image';
import MeetAndAssistMobileView from './mobile/MeetAndAssistMobileView';
import LoungeMobileView from './mobile/LoungeMobileView';
import BaggageWrappingMobileView from './mobile/BaggageWrappingMobileView';

const HeroBooking = ({
  data,
  activeIndex,
}: {
  data: ServiceData | undefined | any;
  activeIndex: number;
}) => {
  const [activeService, setActiveService] = useState<any>('meet');

  return (
    <div className='w-full min-h-screen relative  pt-40'>
      <div className='flex flex-col lg:flex-row items-start justify-between gap-10  sm:px-[3%] md:px-[5%] lg:px-[7%]'>
        {/* Left side - Text */}
        <div className='hidden md:block'>
          {activeIndex === 1 ? (
            <div className='flex-1 min-w-[280px] max-w-[500px] mt-10 lg:mt-15'>
              <h1 className='text-5xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg'>
                Smooth Arrival, <br /> Hassle-Free Experience
              </h1>

              <p className='text-lg md:text-xl mb-6 text-white drop-shadow-md backdrop-blur-[2px]'>
                Step off your flight and relax—our friendly airport concierge will welcome you,
                handle your luggage, and guide you through every step of the airport journey
                effortlessly.
              </p>
            </div>
          ) : activeIndex === 2 ? (
            <div className='flex-1 min-w-[280px] max-w-[500px] mt-10 lg:mt-15'>
              <h1 className='text-5xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg'>
                Relax in Comfort, <br /> Lounge in Style
              </h1>
              <p className='text-lg md:text-xl mb-6 text-white drop-shadow-md backdrop-blur-[2px]'>
                Escape the rush. Enjoy premium lounge access with cozy seating, gourmet
                refreshments, high-speed Wi-Fi, and a calm space to unwind before your flight.
              </p>
            </div>
          ) : activeIndex === 3 ? (
            <div className='flex-1 min-w-[280px] max-w-[500px] mt-10 lg:mt-15'>
              <h1 className='text-5xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg'>
                Secure Your Journey, <br /> Protect Your Peace of Mind
              </h1>
              <p className='text-lg md:text-xl mb-6 text-white drop-shadow-md backdrop-blur-[2px]'>
                Safeguard your belongings from damage, tampering, and theft. Our professional
                luggage wrapping service provides a durable, tamper-evident film for a worry-free
                trip.
              </p>
            </div>
          ) : (
            <>
              <div className='flex-1 min-w-[280px] max-w-[500px] mt-10 lg:mt-15'>
                <h1 className='text-5xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg'>
                  Effortless Travel, <br /> Tailored for You
                </h1>
                <p className='text-lg md:text-xl mb-6 text-white drop-shadow-md backdrop-blur-[2px]'>
                  Skip the hassle. From arrival to departure, enjoy VIP airport care, priority
                  services, and personal support every step of the way.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right side - Booking Form */}
        <div className='flex-1 min-w-[370px] mx-auto sm:mx-0 max-w-[800px] mt-5 md:mt-5 z-20'>
          {/* Use sticky for large screens, normal flow for small screens */}
          <div className='bg-[var(--color-card)] rounded-sm sm:rounded-2xl p-2 md:p-6 shadow-xl lg:sticky'>
            {/* Tabs */}

            <div className='rounded-md px-4 pb-3 mb-2 flex items-center justify-center '>
              <h2 className='text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#12293F] bg-[#F9FAFB] px-2 rounded-md'>
                Services available <span className='text-[#1D4ED8]'>only</span> for{' '}
                <span className='relative inline-block'>
                  Dhaka Airport
                  <svg
                    className='absolute left-0 -bottom-1 w-full h-2'
                    viewBox='0 0 100 10'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0,5 C30,10 70,0 100,5'
                      stroke='#1D4ED8'
                      strokeWidth='1.5'
                      fill='transparent'
                    />
                  </svg>
                </span>
              </h2>
            </div>

            <div className='grid grid-cols-3 gap-2 px-1 md:px-0 lg:gap-5 justify-items-center sm:flex sm:justify-between sm:items-center mb-1 sm:mb-2'>
              {[
                { key: 'meet', label: 'Meet & Assist', img: '/images/meet_and_assist.png' },
                { key: 'lounge', label: 'Lounge', img: '/images/lounge.png' },
                { key: 'baggage', label: 'Luggage Wrapping', img: '/images/luggage.png' },
              ].map((service) => (
                <button
                  key={service.key}
                  type='button'
                  onClick={() => setActiveService(service.key)}
                  className={`group cursor-pointer flex flex-col items-center justify-center 
        py-1 sm:py-2 sm:px-2 rounded-sm sm:rounded-2xl border transition-all duration-300 w-full
        ${
          activeService === service.key
            ? 'border-[var(--color-primary)] shadow-[0_4px_14px_rgba(0,0,0,0.1)] scale-[1.02] bg-white'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 sm:w-14 sm:h-14 rounded-xl transition-all duration-300
          ${
            activeService === service.key
              ? 'bg-[var(--color-primary)]/10'
              : 'bg-gray-100 group-hover:bg-gray-200'
          }`}
                  >
                    <Image
                      alt={service.label}
                      src={service.img}
                      width={28}
                      height={28}
                      className='w-4 h-4 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110'
                    />
                  </div>
                  <span
                    className={`sm:mt-2 text-[8px] sm:text-sm font-medium transition-colors text-center ${
                      activeService === service.key
                        ? 'text-[var(--color-primary)]'
                        : 'text-gray-700 group-hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Forms */}
            <div>
              <div className='block md:hidden'>
                {activeService === 'meet' && <MeetAndAssistMobileView data={data?.meetAndAssist} />}
              </div>
              <div className='hidden md:block'>
                {activeService === 'meet' && <MeetAndAssistBook data={data?.meetAndAssist} />}
              </div>

              <div className='block md:hidden'>
                {activeService === 'lounge' && <LoungeMobileView data={data?.lounge} />}
              </div>
              <div className='hidden md:block'>
                {activeService === 'lounge' && <LoungeBook data={data?.lounge} />}
              </div>

              <div className='block md:hidden'>
                {activeService === 'baggage' && (
                  <BaggageWrappingMobileView data={data?.baggageWrapping} />
                )}
              </div>
              <div className='hidden md:block'>
                {activeService === 'baggage' && <BaggageBook data={data?.baggageWrapping} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBooking;
