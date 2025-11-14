import React from 'react';

const BCCBlog = () => {
  const blogs = [...Array(3)];

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-6 lg:px-0 container mx-auto flex flex-col items-center gap-12'>
      {/* Heading */}
      <div className='w-full max-w-2xl flex flex-col items-center gap-2 text-center'>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-orange-500 font-['Bebas_Neue']">
          BCC Blog
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-black font-['Onest'] leading-6 sm:leading-7">
          The best lessons in life are learned on the playground.
        </p>
      </div>

      {/* Blog Cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
        {blogs.map((_, i) => (
          <div
            key={i}
            className='flex flex-col gap-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition'
          >
            {/* Blog Image */}
            <div className='w-full relative h-64 sm:h-72 md:h-80'>
              <img
                src='https://placehold.co/416x340'
                alt='blog'
                className='w-full h-full object-cover rounded-t-2xl'
              />
            </div>

            {/* Blog Content */}
            <div className='p-4 flex flex-col gap-3'>
              <div className='text-sm sm:text-base md:text-lg font-["Roboto_Mono"] text-neutral-950'>
                মাদক কে না বলুন মাদক নয়, মাঠ হোক তরুণদের আসল ঠিকানা
              </div>
              <span className='text-sm sm:text-base md:text-lg font-bold font-["Roboto_Mono"] underline text-neutral-950'>
                বিস্তারিত পড়ুন.....
              </span>

              {/* Footer */}
              <div className='flex justify-between items-center mt-2'>
                <div className='text-xs sm:text-sm text-zinc-600 font-["Poppins"]'>
                  October 22, 2025
                </div>
                <div className='w-10 h-10 sm:w-11 sm:h-11'>
                  <img src='/bccImages/arrow.png' alt='arrow' className='w-full h-full' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BCCBlog;
