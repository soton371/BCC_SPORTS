'use client';

import { useState } from 'react';
import HeroBackground from './HeroBackground';
import HeroBooking from '@/components/homepage/HeroBooking';
import { ServiceData } from './hero';

export default function HeroBackgroundClient({ data }: { data: ServiceData | undefined }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <HeroBackground onSlideChange={setActiveIndex} />
      {/* <div className='relative z-20 pt-16 md:pt-20 lg:pt-28'> */}
      <div>
        <HeroBooking data={data} activeIndex={activeIndex} />
      </div>
    </>
  );
}
