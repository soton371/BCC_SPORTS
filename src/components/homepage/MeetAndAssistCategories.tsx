'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useGetAvailableServicesQuery } from '@/lib/APIs/common-api';
import Link from 'next/link';

const MeetAndAssistCategories = () => {
  const { data, isLoading } = useGetAvailableServicesQuery();

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
  const serviceCategories = data?.data?.meetAndAssist?.reduce(
    (acc, item) => {
      if (item.category_name) {
        acc[item.category_name] = item; // key is category_name, value is the item object
      }
      return acc;
    },
    {} as Record<string, (typeof data.data.meetAndAssist)[0]>,
  );

  console.log(serviceCategories);

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
    <motion.section
      className='px-6 py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-20 right-20 w-96 h-96 bg-sky-200/15 rounded-full blur-3xl'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className='mb-6 bg-blue-100 text-blue-800 border-blue-200 text-lg px-6 py-2'>
            🎯 Choose Your Experience
          </Badge>
          <h2 className='text-4xl md:text-5xl pb-3 font-black mb-6 text-gray-800 bg-gradient-to-r from-blue-800 via-sky-700 to-cyan-600 bg-clip-text text-transparent'>
            Meet & Assist Service Categories
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Select the perfect service level that matches your travel needs. Each category is
            designed to provide exceptional value and comfort.
          </p>
        </motion.div>

        {/* Service Categories Grid */}
        <motion.div
          className='grid md:grid-cols-3 gap-8 lg:gap-12'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              category_id: 3,
              category_name: 'Standard',
              category_features:
                'Standard Meet & Assist (before Immigration point), Luggage handling',
              regular_price: 315,
              discount_price: 267.75,
              icon: '🌟',
              color: 'from-blue-600 to-cyan-600',
              bgColor: 'from-blue-50 to-cyan-50',
              borderColor: 'border-blue-200',
              textColor: 'text-blue-800',
              buttonBg: 'bg-blue-600 hover:bg-blue-700',
              popular: false,
            },
            {
              category_id: 5,
              category_name: 'Premium',
              category_features:
                'Special Meet & Assist (beyond immigration point), Luggage handling, Phone calls (10 mins), Internet & printout (4 pages)',
              regular_price: 525,
              discount_price: 446.25,
              icon: '👑',
              color: 'from-purple-600 to-pink-600',
              bgColor: 'from-purple-50 to-pink-50',
              borderColor: 'border-purple-200',
              textColor: 'text-purple-800',
              buttonBg: 'bg-purple-600 hover:bg-purple-700',
              popular: true,
            },
            {
              category_id: 6,
              category_name: 'Medium',
              category_features:
                'Special Meet & Assist (beyond immigration point), Luggage handling, Phone calls (10 mins), Internet & printout (4 pages)',
              regular_price: 525,
              discount_price: 446.25,
              icon: '⭐',
              color: 'from-emerald-600 to-teal-600',
              bgColor: 'from-emerald-50 to-teal-50',
              borderColor: 'border-emerald-200',
              textColor: 'text-emerald-800',
              buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
              popular: false,
            },
          ].map((service, index) => (
            <motion.div
              key={service.category_id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='relative flex flex-col h-full'
            >
              {service.popular && (
                <motion.div
                  className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-20'
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <Badge className='bg-orange-600 text-white border-0 px-4 py-1 text-sm font-bold shadow-lg'>
                    🔥 Most Popular
                  </Badge>
                </motion.div>
              )}

              <Card
                className={`relative overflow-hidden bg-gradient-to-br ${service.bgColor} ${service.borderColor} border-2 hover:border-opacity-60 transition-all duration-500 flex flex-col h-full`}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.color}`}
                />

                {/* Card Content */}
                <div className='p-8 relative z-10 flex flex-col flex-1'>
                  <div>
                    {/* Icon & Name */}
                    <div className='text-center mb-6'>
                      <motion.div
                        className='text-6xl mb-4'
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className={`text-2xl font-black ${service.textColor} mb-2`}>
                        {service.category_name}
                      </h3>
                    </div>

                    {/* Pricing */}
                    <div className='text-center mb-8'>
                      <div className='flex items-center justify-center gap-3 mb-2'>
                        <span className='text-3xl font-black text-gray-800'>
                          {service.discount_price}
                        </span>
                        <span className='text-lg text-gray-500 line-through'>
                          {service.regular_price}
                        </span>
                      </div>
                      <motion.div
                        className='inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold'
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        💰 Save {(service.regular_price - service.discount_price).toFixed(2)}
                      </motion.div>
                    </div>

                    {/* Features */}
                    <div className='space-y-3'>
                      {service.category_features.split(', ').map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className='flex items-start gap-3 text-gray-700'
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                        >
                          <div className='w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 flex-shrink-0' />
                          <span className='text-sm leading-relaxed'>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button pinned at bottom */}
                  <motion.div
                    className='mt-auto'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={'/'}>
                      <Button
                        className={`w-full ${service.buttonBg} text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0`}
                        size='lg'
                      >
                        Book Now
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Hover Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
            className='text-center mt-16'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className='inline-block p-6 bg-blue-600 border-blue-200'>
              <p className='text-white mb-4 text-lg'>
                🎁 <strong>Special Offer:</strong> Book any service today and get complimentary
                airport Wi-Fi access!
              </p>
              <Button
                size='lg'
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0'
              >
                Compare All Services
              </Button>
            </Card>
          </motion.div> */}
      </div>
    </motion.section>
  );
};

export default MeetAndAssistCategories;
