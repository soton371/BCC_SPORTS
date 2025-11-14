import React from 'react';

const BCCPhotoGallery = () => {
  return (
    <section className='py-12 sm:py-16 bg-orange-50 text-center px-4 sm:px-6 lg:px-0'>
      <div className='container mx-auto space-y-5'>
        {/* Heading */}
        <h2 className='text-3xl  sm:text-4xl md:text-6xl font-bebas font-bold text-blue-950'>
          BCC Photo Gallery
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-gray-700 font-semibold'>
          Photo gallery of BCC. We are together, We are rivals, We are power.
        </p>

        {/* Photo Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6'>
          {[...Array(8)].map((_, i) => {
            const isSecondRow = i >= 3 && i <= 5;

            return (
              <div
                key={i}
                className='relative rounded-lg overflow-hidden bg-gradient-to-b from-black/0 to-black/40'
                style={{
                  height: isSecondRow ? '200px' : '220px', // smaller height for second row on mobile
                }}
              >
                <img
                  src={`https://placehold.co/400x400?text=Photo+${i + 1}`}
                  alt={`Gallery ${i + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <button className='mt-6 sm:mt-8 px-5 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400'>
          View All
        </button>
      </div>
    </section>
  );
};

export default BCCPhotoGallery;
