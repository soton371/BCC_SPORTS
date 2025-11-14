'use client';

import { ImageWithLoading } from '@/components/image-with-loading';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
interface Props {
  onSlideChange?: (index: number) => void;
}

export default function HeroBackground({ onSlideChange }: Props) {
  const images = [
    '/images/bg_airport.jpg',
    '/images/meet_and_assist_backgroud.jpg',
    '/images/lounge.jpg',
    '/images/luggage1.webp',
  ];

  return (
    <div>
      <div className='w-full absolute inset-0 z-0 hidden sm:block'>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect='fade'
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className='h-full'
          onSlideChange={(swiper) => onSlideChange?.(swiper.realIndex)}
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className='relative h-full max-h-[850px] overflow-hidden'>
                {/* Background Image */}
                <ImageWithLoading
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className='brightness-[0.8] scale-105 animate-zoomSlow'
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* this for mobile devices */}
      <div className='w-full absolute inset-0 z-0 -top-[70px] block sm:hidden'>
        <div className='relative h-full max-h-[850px] overflow-hidden'>
          {/* Background Image */}
          <ImageWithLoading
            src={images[0]}
            alt={`Slide `}
            className='brightness-[0.8] scale-105 animate-zoomSlow'
          />

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
        </div>
      </div>
    </div>
  );
}
