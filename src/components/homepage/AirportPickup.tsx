'use client';

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import image1 from '../../../public/images/pickup1.png';
import image2 from '../../../public/images/pickup2.png';

const AirportPickup = () => {
  return (
    <section className='relative bg-cover bg-center bg-no-repeat py-24'>
      {/* Overlay */}
      {/* <div className='absolute inset-0 bg-black/40'></div> */}

      <div className='relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6'>
        {/* Left Images */}
        <div className='flex flex-col sm:flex-row gap-6 lg:w-1/2'>
          <div className='relative w-full sm:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl'>
            <Image src={image1} alt='Airport Service 1' fill className='object-cover' />
          </div>
          <div className='relative w-full sm:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl'>
            <Image src={image2} alt='Airport Service 2' fill className='object-cover' />
          </div>
        </div>

        {/* Right Text */}
        <div className='lg:w-1/2 bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl'>
          <h2 className='text-3xl md:text-4xl font-extrabold mb-6 text-sky-800'>
            Our Airport Pickup & Drop - Airport BD Services
          </h2>
          <ul className='space-y-4 text-gray-700 text-lg'>
            <li className='flex items-center gap-3'>
              <FaCheckCircle className='text-sky-500 text-xl' /> Safe ride to anywhere in the
              capital city
            </li>
            <li className='flex items-center gap-3'>
              <FaCheckCircle className='text-sky-500 text-xl' /> Friendly chauffeur
            </li>
            <li className='flex items-center gap-3'>
              <FaCheckCircle className='text-sky-500 text-xl' /> Vehicle under surveillance and
              tracking
            </li>
          </ul>
          <p className='mt-6 text-gray-600 italic'>
            Travel in comfort and style with our premium airport pickup and drop service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AirportPickup;
