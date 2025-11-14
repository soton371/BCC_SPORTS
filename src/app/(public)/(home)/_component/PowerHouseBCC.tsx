import React from 'react';

const PowerHouseBCC = () => {
  return (
    <section className='py-12 sm:py-16 text-center text-white px-4 sm:px-6 lg:px-0'>
      <div className='container mx-auto space-y-6'>
        {/* Heading */}
        <h2 className='text-2xl sm:text-4xl md:text-6xl font-bebas font-bold uppercase text-orange-500'>
          Power House of BCC
        </h2>
        <p className='text-sm sm:text-base md:text-lg max-w-2xl text-black font-semibold mx-auto'>
          This is the power house of BCC. They are always ready for BCC. Power - Unity - Victory
        </p>

        {/* Power House Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='rounded-lg overflow-hidden bg-neutral-700'>
              <img
                src='https://placehold.co/300x300'
                alt='powerhouse'
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerHouseBCC;
