'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import image1 from '../../../public/images/meet_and_assist1.jpg';
import image2 from '../../../public/images/mee_and_assist2.jpg';
import image3 from '../../../public/images/lounge.jpg';
import image4 from '../../../public/images/lounge3.webp';
import MeetAndAssistCategories from './MeetAndAssistCategories';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TwentyFourHourService from './TwentyFourHourService';
function AirportServices() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className='relative z-10 overflow-hidden'>
      {/* Meet & Assist with enhanced animations */}
      <motion.section
        className='px-6 py-20 lg:py-28 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 relative overflow-hidden'
        initial={{ opacity: 2 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent'></div>
        </div>

        <motion.div
          className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10'
          // variants={containerVariants}
          // initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Image with Hover Effects */}
          <motion.div
            className='w-full lg:w-1/3'
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            // transition={{ duration: 0.3 }}
          >
            <div className='relative w-full h-full rounded-3xl overflow-hidden shadow-2xl min-h-[300px] group'>
              <Image
                src={image1}
                alt='Airport staff with luggage'
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </motion.div>

          {/* Enhanced Text Content */}
          <motion.div
            className='w-full lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500'
            variants={itemVariants}
            onHoverStart={() => setHoveredService('meet-assist')}
            onHoverEnd={() => setHoveredService(null)}
          >
            <motion.div
              animate={{ scale: hoveredService === 'meet-assist' ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className='mb-4 bg-sky-100 text-sky-800 border-sky-200'>Premium Service</Badge>
              <h2 className='text-3xl md:text-4xl font-extrabold mb-6 text-sky-800'>
                Our Premium Meet & Assist Services
              </h2>
              <p className='text-gray-700 mb-6 text-lg leading-relaxed'>
                Our professional airport staff ensures that your journey is smooth, fast, and
                comfortable. From arrival to departure, we take care of all the details so you can
                relax and focus on what matters most.
              </p>

              <div className='space-y-4 text-gray-700 text-lg mb-8'>
                {[
                  {
                    icon: '🤝',
                    text: 'Meet & Assist on Arrival/Departure – Personalized support at every step.',
                  },
                  {
                    icon: '⚡',
                    text: 'Fast-track through check points – Skip long queues effortlessly.',
                  },
                  {
                    icon: '🧳',
                    text: 'Luggage handling – Your bags handled safely and efficiently.',
                  },
                  {
                    icon: '💱',
                    text: 'Currency conversion, SIM cards & travel essentials – All ready at arrival.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className='flex items-start gap-4 p-3 rounded-xl hover:bg-sky-50 transition-colors duration-200'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className='text-2xl'>{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Card className='p-4 bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200'>
                <p className='text-sky-800 font-medium text-center'>
                  ✨ Experience the VIP treatment you deserve at every airport
                </p>
              </Card>
            </motion.div>

            <div className='max-w-4xl mx-auto text-center relative z-10 mt-5'>
              <motion.div
                className='flex flex-col sm:flex-row gap-6 justify-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Book Now Button */}
                <Link href={'/'}>
                  <Button
                    size='lg'
                    className='bg-white text-sky-800 hover:bg-blue-50 font-bold px-10 py-4 text-sm rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105'
                  >
                    Book Now
                  </Button>{' '}
                </Link>

                <Link href={'/services/meet-and-greet'}>
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-2 text-sky-800 font-bold px-10 py-4 text-sm rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200'
                  >
                    Learn More
                  </Button>{' '}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image with Animation */}
          <motion.div
            className='w-full lg:w-1/4'
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <div className='aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group'>
              <Image
                src={image2}
                alt='Airport staff at check-in counter'
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
      <TwentyFourHourService />
      {/* Meet & Assist Service Categories Section */}
      {/* <MeetAndAssistCategories /> */}

      {/* Enhanced Lounges Section */}
      <motion.section
        className='px-6 py-20 lg:py-28 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            className='absolute top-10 right-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Image */}
          <motion.div
            className='w-full lg:w-1/4'
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className='aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group'>
              <Image
                src={image3}
                alt='Luxury airport lounge interior'
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </motion.div>

          {/* Enhanced Text Content */}
          <motion.div
            className='w-full lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500'
            variants={itemVariants}
            onHoverStart={() => setHoveredService('lounge')}
            onHoverEnd={() => setHoveredService(null)}
          >
            <motion.div
              animate={{ scale: hoveredService === 'lounge' ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className='mb-4 bg-emerald-100 text-emerald-800 border-emerald-200'>
                Luxury Experience
              </Badge>
              <h2 className='text-3xl md:text-4xl font-extrabold mb-6 text-emerald-800'>
                Luxury Airport Lounges
              </h2>
              <p className='text-gray-700 mb-6 text-lg leading-relaxed'>
                Step into our world-class lounges where comfort meets elegance. Perfect for
                relaxing, working, or enjoying gourmet meals before your flight. Every detail is
                crafted for your ultimate comfort.
              </p>

              <div className='space-y-4 text-gray-700 text-lg mb-8'>
                {[
                  { icon: '📶', text: 'Complimentary Wi-Fi – Stay connected anytime, anywhere.' },
                  { icon: '🍽️', text: 'International cuisine – Savor fresh and delicious meals.' },
                  {
                    icon: '🎮',
                    text: 'Kids play area – Fun for the little ones in select lounges.',
                  },
                  {
                    icon: '🥂',
                    text: 'Premium beverages – Both alcoholic & non-alcoholic options.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className='flex items-start gap-4 p-3 rounded-xl hover:bg-emerald-50 transition-colors duration-200'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className='text-2xl'>{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Card className='p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'>
                <p className='text-emerald-800 font-medium text-center'>
                  🌿 A calm oasis away from the hustle and bustle of the airport
                </p>
              </Card>

              <Link href={'/'}>
                <div className='max-w-4xl mx-auto text-center relative z-10 mt-5'>
                  <motion.div
                    className='flex flex-col sm:flex-row gap-6 justify-center'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button
                      size='lg'
                      className='bg-white text-sky-800 hover:bg-blue-50 font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105'
                    >
                      Book Now
                    </Button>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className='w-full lg:w-1/3'
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className='aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group'>
              <Image
                src={image4}
                alt='Airport lounge staff'
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* New CTA Section */}
      {/* <motion.section
        className='px-6 py-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent'></div>
        </div>

        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <motion.h2
            className='text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Travel?
          </motion.h2>

          <motion.p
            className='text-xl mb-10 text-blue-100 leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of satisfied travelers who have elevated their airport experience with
            our premium services.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-6 justify-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size='lg'
              className='bg-white text-purple-900 hover:bg-blue-50 font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105'
            >
              Book Now
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white/20 bg-white/10 font-semibold px-10 py-4 text-lg rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300'
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
}

export default AirportServices;
