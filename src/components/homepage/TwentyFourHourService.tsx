'use client';

import { Phone, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactInfoBar = () => {
  return (
    <section className='bg-gradient-to-r from-[#12293F] via-[#00598A] to-[#12293F] text-white py-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center px-6'>
        {/* Service Time */}
        <motion.div
          className='flex flex-col items-center justify-center py-4'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Clock className='w-10 h-10 mb-3 text-[#00B4D8]' />
          <p className='font-bold text-lg'>24x7 SERVICE</p>
        </motion.div>

        {/* Location */}
        <motion.div
          className='flex flex-col items-center justify-center py-4'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MapPin className='w-10 h-10 mb-3 text-[#00B4D8]' />
          <p className='font-bold text-lg'>
            Hazrat Shahjalal International Airport (HSIA) <br /> Dhaka, Bangladesh
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          className='flex flex-col items-center justify-center py-4'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className='flex space-x-4 mb-3'>
            <Phone className='w-8 h-8 text-[#00B4D8]' />
            <FaWhatsapp className='w-8 h-8 text-[#00B4D8]' />
          </div>
          <p className='font-bold text-lg'>+8801930303201</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfoBar;
