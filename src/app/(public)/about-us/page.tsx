import { FaCheckCircle } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='relative'>
      {/* Hero Section */}
      <section
        className='relative bg-cover bg-center h-[40vh] flex items-center justify-center'
        style={{ backgroundImage: "url('/images/bg_airport.jpg')" }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative text-center px-6'>
          <h1 className='text-4xl md:text-5xl  font-extrabold text-white mb-4 underline underline-offset-4'>
            About Us
          </h1>
          <p className='text-lg md:text-2xl text-white'>
            Making your airport journey seamless, comfortable, and luxurious.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className='mt-10 py-2 px-10  max-w-7xl mx-auto'>
        <div className='mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>About Sohi</h2>
          <p className='text-gray-700 text-lg md:text-xl text-justify'>
            At Sohi , we are dedicated to providing premium that ensure a smooth and enjoyable
            travel experience. From the moment you arrive at the airport until your departure, our
            trained staff takes care of everything — Meet & Assist, luxury lounges, baggage
            handling, and convenient airport pickups and drops. Your comfort and satisfaction are
            our top priorities.
          </p>
        </div>
        <div className='mt-5'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Who We Are</h2>
          <p>
            Sohi , established in Dhaka, is a premier travel agency with a strong reputation in the
            travel and tourism industry. We uphold the highest standards of service to ensure
            reliability and trustworthiness.
          </p>
          <p className='mt-5'>
            Our experienced professionals handle every detail — from booking flights and arranging
            visa support to curating exclusive holiday packages and organizing your Umrah pilgrimage
            — with utmost care and efficiency.
          </p>
        </div>
        <div className='mt-5'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Our Services</h2>

          <ul className='mt-5 space-y-3 list-disc list-inside text-gray-700'>
            <li>
              <span className='font-semibold text-sky-700'>Meet & Assist : </span>
              Personalized airport assistance to make your journey stress-free.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Pick & Drop : </span>
              Reliable airport transfers for individuals and groups.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Lounge Access : </span>
              Comfortable and relaxing spaces to unwind before your flight.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Baggage Wrapping : </span> Secure
              wrapping to protect your luggage during travel.
            </li>
          </ul>
        </div>
        <div className='mt-12'>
          {/* Heading */}
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Why Choose Us?</h2>

          {/* Description */}
          <p className='mb-6 text-gray-700'>
            At <span className='font-semibold text-sky-700'>Sohi </span>, we are committed to
            delivering a seamless and trustworthy travel experience. Here’s why travelers prefer us:
          </p>

          {/* Bullet Points */}
          <ul className='space-y-4 text-gray-700'>
            <li className='flex items-start gap-3'>
              <FaCheckCircle className='text-sky-600 text-xl mt-1' />
              <span>
                <span className='font-semibold'>Customer-Centric Approach:</span> Tailored solutions
                for your needs.
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <FaCheckCircle className='text-sky-600 text-xl mt-1' />
              <span>
                <span className='font-semibold'>Experienced Professionals:</span> Efficient handling
                of travel arrangements.
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <FaCheckCircle className='text-sky-600 text-xl mt-1' />
              <span>
                <span className='font-semibold'>Reliability & Transparency:</span> No hidden charges
                or surprises.
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <FaCheckCircle className='text-sky-600 text-xl mt-1' />
              <span>
                <span className='font-semibold'>24/7 Customer Support:</span> Assistance whenever
                you need it.
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <FaCheckCircle className='text-sky-600 text-xl mt-1' />
              <span>
                <span className='font-semibold'>Digital Solutions:</span> Easy online booking with
                secure payments.
              </span>
            </li>
          </ul>
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Our Mission</h2>
          <p className='text-gray-700 leading-relaxed'>
            To provide exceptional travel services that exceed expectations — creating lifelong
            memories and inspiring a love for exploring the world.
          </p>
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Our Vision</h2>
          <p className='text-gray-700 leading-relaxed'>
            To be Bangladesh’s leading travel agency, celebrated for integrity, innovation, and
            outstanding customer service — setting new industry standards through technology and
            continuous improvement.
          </p>
        </div>
        <div className='mt-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-6'>Our Core Values</h2>

          <ul className='space-y-4 text-gray-700 list-disc list-inside'>
            <li>
              <span className='font-semibold text-sky-700'>Integrity :</span> Honesty and
              transparency in all interactions.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Excellence :</span> Commitment to the
              highest quality of service.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Customer Satisfaction :</span> Dedicated
              to exceeding expectations.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Innovation :</span> Embracing change to
              enhance services.
            </li>
            <li>
              <span className='font-semibold text-sky-700'>Sustainability :</span> Responsible
              tourism for future generations.
            </li>
          </ul>
        </div>

        <div className='mt-10'>
          <p className='text-center text-gray-500'>
            Ready to plan your next journey? Connect with our expert team today — we’ll take care of
            every detail to make it seamless and memorable!"
          </p>
          <p className='text-center text-gray-500 mt-3 py-3'>© Sohi . All rights reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
