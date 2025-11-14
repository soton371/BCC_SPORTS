'use client';
import React from 'react';
import { Users, Zap, Star, Car, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Packages from '@/components/homepage/Packages';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MeetAndGreetDetailsPage = () => {
  const services = [
    {
      icon: <Users className='w-6 h-6 text-[#49535c]' />,
      title: 'Warm Welcome & Assistance',
      description: 'Dedicated team greets you, handles luggage, and provides guidance',
    },
    {
      icon: <Zap className='w-6 h-6 text-[#49535c]' />,
      title: 'Expedited Procedures',
      description: 'Swift passage through immigration and customs',
    },
    {
      icon: <Star className='w-6 h-6 text-[#49535c]' />,
      title: 'Priority Services',
      description: 'Includes priority check-in and fast-track security.',
    },
    {
      icon: <HeartHandshake className='w-6 h-6 text-[#49535c]' />,
      title: 'VIP Lounge Access',
      description: 'Enjoy exclusive lounge facilities.',
    },
    {
      icon: <Car className='w-6 h-6 text-[#49535c]' />,
      title: 'Comfortable Transportation',
      description: 'Arranged to your final destination.',
    },
    {
      icon: <Users className='w-6 h-6 text-[#49535c]' />,
      title: 'Personalized Support',
      description: 'Additional assistance available upon request.',
    },
  ];

  return (
    <>
      {/* 1st Section ------------------ */}
      <motion.div
        className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <div className='container mx-auto px-6 py-16'>
          {/* Header */}
          <motion.div
            className='text-center mb-16'
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className='text-4xl md:text-5xl font-bold text-[#12293F] mb-6 tracking-tight'
              variants={fadeUp}
            >
              MEET and GREET SERVICE DHAKA AIRPORT
            </motion.h1>
            <motion.p
              className='text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed'
              variants={fadeUp}
            >
              Experience seamless airport travel with our personalized meet and greet service{' '}
              <span className='text-blue-600 font-medium'>Dhaka</span> airport. We ensure comfort,
              efficiency, and peace of mind from arrival to departure.
            </motion.p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Services List */}
            <motion.div
              className='space-y-8'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.15 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className='flex items-start space-x-4 group'
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  {/* Timeline dot */}
                  <div className='flex flex-col items-center'>
                    <motion.div
                      className='w-12 h-12 bg-white rounded-full border-4 border-[#12293F] flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors duration-200'
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {service.icon}
                    </motion.div>
                    {index < services?.length - 1 && (
                      <div className='w-0.5 h-12 bg-[#12293F] mt-2'></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='flex-1 pb-6'>
                    <h3 className='text-xl font-semibold text-slate-800 mb-2 group-hover:slate-800 transition-colors duration-200'>
                      {service.title}
                    </h3>
                    <p className='text-slate-600 leading-relaxed'>{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Airport Illustration */}
            <motion.div className='relative' variants={fadeUp} transition={{ duration: 0.6 }}>
              <motion.div
                className='bg-gradient-to-t from-blue-100 to-blue-50 rounded-3xl p-8 shadow-xl'
                whileHover={{ scale: 1.02 }}
              >
                <div className='relative h-96 bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl overflow-hidden'>
                  <Image
                    src='/images/meet_greet.webp'
                    alt='Airport terminal illustration'
                    fill
                    className='object-cover rounded-2xl opacity-80'
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* -------- 2nd Section */}
      <Packages />
    </>
  );
};

export default MeetAndGreetDetailsPage;
