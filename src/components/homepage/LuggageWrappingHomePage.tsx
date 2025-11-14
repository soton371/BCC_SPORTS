'use client';

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import image1 from '../../../public/images/luggage1.webp';
import image2 from '../../../public/images/luggage2.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const LuggageWrappingHomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className='relative bg-cover bg-center bg-no-repeat py-24'>
      {/* Container */}
      <motion.div
        className='relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }} // animates every time in view
      >
        {/* Left Images */}
        <motion.div className='flex flex-col sm:flex-row gap-6 lg:w-1/2' variants={itemVariants}>
          <div className='relative w-full sm:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl'>
            <Image src={image1} alt='Luggage Wrapping 1' fill className='object-cover' />
          </div>
          <div className='relative w-full sm:w-1/2 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl'>
            <Image src={image2} alt='Luggage Wrapping 2' fill className='object-cover' />
          </div>
        </motion.div>

        {/* Right Text */}
        <motion.div
          className='lg:w-1/2 bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl'
          variants={itemVariants}
        >
          <motion.h2
            className='text-3xl md:text-4xl font-extrabold mb-6 text-sky-800'
            variants={itemVariants}
          >
            Secure Luggage Wrapping – Airport BD Services
          </motion.h2>
          <motion.ul className='space-y-4 text-gray-700 text-lg' variants={itemVariants}>
            <motion.li className='flex items-center gap-3' variants={itemVariants}>
              <FaCheckCircle className='text-sky-500 text-xl' /> Protect your baggage from scratches
              and damage
            </motion.li>
            <motion.li className='flex items-center gap-3' variants={itemVariants}>
              <FaCheckCircle className='text-sky-500 text-xl' /> Extra security against tampering
            </motion.li>
            <motion.li className='flex items-center gap-3' variants={itemVariants}>
              <FaCheckCircle className='text-sky-500 text-xl' /> Waterproof & weather resistant wrap
            </motion.li>
          </motion.ul>
          <motion.p className='mt-6 text-gray-600 italic' variants={itemVariants}>
            Travel stress-free knowing your luggage is safe, secure, and well-protected.
          </motion.p>

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
    </section>
  );
};

export default LuggageWrappingHomePage;
