import React from 'react';

const BCCMemberList = () => {
  return (
    <section
      className='py-10 sm:py-20 z-20 bg-[#EFFFFD] bg-cover bg-center'
      style={{
        backgroundImage: "url('/bccImages/bcc_membersection.png')",
      }}
    >
      <div className='container mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0'>
        {/* Heading */}
        <div>
          <h2 className='text-3xl sm:text-4xl md:text-6xl font-bebas font-bold text-blue-950'>
            BCC Member List
          </h2>
          <p className='text-sm sm:text-base md:text-lg font-semibold text-gray-600'>
            Talented athletes dedicated to cricket excellence
          </p>
        </div>

        {/* Category Buttons */}
        <div className='flex flex-wrap justify-center gap-3 sm:gap-6 border-b pb-4'>
          {['All Player', 'Cricket', 'Football', 'Badminton'].map((cat, i) => (
            <button
              key={cat}
              className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-onest ${
                i === 0 ? 'border-b-4 border-orange-500 text-orange-500' : 'text-blue-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Member Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-10'>
          {[...Array(12)].map((_, i) => (
            <div key={i} className='relative rounded-lg overflow-hidden'>
              <img
                src='https://placehold.co/300x400'
                alt='player'
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white'>
                <h4 className='font-semibold text-sm sm:text-base'>Istiak Turjo</h4>
                <p className='text-xs sm:text-sm'>Wicket Keeper</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className='px-5 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 mt-6 sm:mt-10'>
          View All
        </button>
      </div>
    </section>
  );
};

export default BCCMemberList;
