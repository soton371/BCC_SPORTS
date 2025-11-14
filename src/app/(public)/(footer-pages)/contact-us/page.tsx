'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // API call can go here
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className='bg-white text-gray-800'>
      {/* Hero Section */}
      <div
        className='contact-header h-72 bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: "url('/images/bg_airport.jpg')" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-4xl lg:text-6xl underline underline-offset-4 font-semibold text-white text-center'
        >
          Contact Us
        </motion.h1>
      </div>

      {/* Intro */}
      <section className='bg-gray-50 py-8 px-6 md:px-20'>
        <motion.p
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='max-w-3xl mx-auto text-center text-gray-700 mb-12'
        >
          We’d love to hear from you! Whether you have a question, need assistance, or want to start
          planning your next journey, our team is here to help.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start'
        >
          {/* Left - Contact Info */}
          <motion.div variants={fadeInUp} className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-800'>Get In Touch</h2>
            <p className='text-gray-600'>
              Have questions or need assistance? Get in touch with us—we’re here to help!
            </p>

            <div className='space-y-3 text-gray-700'>
              <p>
                📍 <span className='font-semibold'>Address:</span> 254/4, WEST MANIKDI, DHAKA
              </p>
              <p>
                📞 <span className='font-semibold'>Phone:</span> +880 1930 303201, +880 1930 303207
              </p>
              <p>
                ✉️ <span className='font-semibold'>Email:</span> info@sohiaviation.com
              </p>
              <p>
                🕜 <span className='font-semibold'>Office Hours: </span> Sat–Thu, 9:00 AM – 8:00 PM:
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div variants={fadeInUp} className='bg-white rounded-lg shadow-lg p-8'>
            <h3 className='text-2xl font-semibold text-gray-800 mb-6'>Send us a Message</h3>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Your Name</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Your name'
                  className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>Your Email</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Your email'
                  className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2'>Message</label>
                <textarea
                  name='message'
                  rows={5}
                  placeholder='Write your message here...'
                  className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition'
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
};

export default ContactUsPage;
