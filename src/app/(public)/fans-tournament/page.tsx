'use client';
import React from 'react';
import BCCHeader from '../(home)/_component/BCCHeader';
import Image from 'next/image';
import PlayerList from '../(home)/_component/PlayerList';
import PlayerPage from '../(home)/_component/PlayerPage';

const FNSTournament = () => {
  return (
    <div>
      <BCCHeader />

      {/* 🔥 Fixed Background Wrapper */}
      <div
        className='w-full relative flex justify-center items-center  mx-auto min-h-[400px] mt-10'
        style={{
          backgroundImage: "url('/bccImages/fans_tournament.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100%',
        }}
      >
        {/* Full Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r h-full min-h-[400px] from-teal-950/90 to-teal-950/70' />

        {/* Content */}
        <div className='relative z-10 flex flex-col justify-start items-center gap-10 max-w-3xl px-4 mx-auto py-10'>
          <div className='flex flex-col justify-start items-center gap-1'>
            {/* Responsive Text Scaling */}
            <div className="text-center text-neutral-50 text-4xl md:text-6xl font-normal font-['Bebas_Neue']">
              BCC Fan’s Tournament- 2025
            </div>
            <div className="text-center text-yellow-400 text-xl md:text-2xl font-light font-['Onest']">
              Arranged by BCC - Passion - Unity - Victory
            </div>
          </div>

          {/* 🔥 Cards Container (Increased gap for 4-column layout) */}
          <div className='flex flex-wrap justify-center items-center gap-5 md:gap-4 w-full'>
            {/* --- Venue Card --- */}
            {/* 🔥 REMOVED max-w-xs. It is no longer needed since lg:w-1/4 is used. */}
            <div className='w-full sm:w-5/12 lg:w-1/4 px-4 py-3 bg-white/10 rounded-lg flex flex-col justify-start items-center gap-3'>
              <div className='w-10 h-10 relative overflow-hidden'>
                <Image alt='1' height={30} width={30} src={'/bccImages/Frame.svg'} />
              </div>
              <div className='flex flex-col justify-start items-center gap-1'>
                <div className="text-center text-white text-base font-light font-['Onest']">
                  Venue
                </div>
                <div className="text-center text-yellow-400 text-lg font-normal font-['Onest']">
                  BCC Stadium
                </div>
              </div>
            </div>

            {/* --- Date Range --- */}
            <div className='w-full sm:w-5/12 lg:w-1/4 px-4 py-3 bg-white/10 rounded-lg flex flex-col justify-start items-center gap-3'>
              <div className='w-10 h-10 relative overflow-hidden'>
                <Image alt='1' height={30} width={30} src={'/bccImages/Frame (1).svg'} />
              </div>
              <div className='flex flex-col justify-start items-center gap-1'>
                <div className="text-center text-white text-base font-light font-['Onest']">
                  Date range
                </div>
                <div className="text-center text-yellow-400 text-lg font-normal font-['Onest']">
                  Dec, 16 - 20
                </div>
              </div>
            </div>

            {/* --- Teams Card --- */}
            <div className='w-full sm:w-5/12 lg:w-1/4 px-4 py-3 bg-white/10 rounded-lg flex flex-col justify-start items-center gap-3'>
              <div className='w-10 h-10 relative overflow-hidden'>
                <Image alt='1' height={30} width={30} src={'/bccImages/Frame (2).svg'} />
              </div>
              <div className='flex flex-col justify-start items-center gap-1'>
                <div className="text-center text-white text-base font-light font-['Onest']">
                  Teams
                </div>
                <div className="text-center text-yellow-400 text-lg font-normal font-['Onest']">
                  6 teams
                </div>
              </div>
            </div>

            {/* --- Champion Card --- */}
            <div className='w-full sm:w-5/12 lg:w-1/4 px-4 py-3 bg-white/10 rounded-lg flex flex-col justify-start items-center gap-3'>
              <div className='w-10 h-10 relative overflow-hidden'>
                {/* Your image/icon code here */}
              </div>
              <div className='flex flex-col justify-start items-center gap-1'>
                <div className="text-center text-white text-base font-light font-['Onest']">
                  Running Champion
                </div>
                <div className="text-center text-yellow-400 text-lg font-normal font-['Onest']">
                  India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlayerPage />
    </div>
  );
};

export default FNSTournament;
