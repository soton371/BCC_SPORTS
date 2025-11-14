'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { CircleCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useGetAvailableServicesQuery } from '@/lib/APIs/common-api';

// Motion wrapper
const MotionCard = motion(Card);

const packages = [
  {
    title: 'SILVER',
    price: 'BDT 500 / USD 4.99',
    description:
      'From departure drop-off up to immigrating or after immigration up to arrival pickup point',
    features: ['Luggage Handling', 'Per Person'],
    image: '/images/silver.webp',
    tier: 'Essential',
  },
  {
    title: 'GOLD',
    price: 'BDT 1000 / USD 8.99',
    description:
      'From departure drop-off up to Boarding Bridge or from on arrival immigration point up to arrival pickup point.',
    features: ['Luggage Handling', 'Immigration assistance', 'Per Person'],
    image: '/images/gold.webp',
    tier: 'Premium',
    popular: true,
  },
  {
    title: 'PLATINUM',
    price: 'BDT 1500 / USD 12.99',
    description: 'Complete VIP airport assistance with priority handling',
    features: [
      'On arrival visa assistance',
      'Domestics to international luggage assistance and vice versa',
      'Luggage Handling',
      'Per Person',
    ],
    image: '/images/platinum.webp',
    tier: 'Executive',
  },
];

const additionalServices = [
  'Wheelchair assistance – BDT 500',
  'Premium car pickup or drop-off – customized pricing based on distance and vehicle class',
  'Executive security escort – from BDT 5,000, tailored to your security requirements and personnel needs',
];

// Animation variants
const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 80, damping: 2 },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Packages() {
  const { data, isLoading } = useGetAvailableServicesQuery();

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100'>
      {/* Header Section */}
      <div className='px-6 md:px-16 pt-20 pb-12'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center max-w-4xl mx-auto'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-[#12293F] mb-4 tracking-tight'>
            OUR packages (Starting From)
          </h2>
          <p className='text-lg text-slate-600 font-medium'>
            Choose from our carefully crafted service packages designed for the modern traveler
          </p>
        </motion.div>
      </div>

      {/* Packages Grid */}
      <div className='px-6 md:px-16 pb-20'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='grid md:grid-cols-4 gap-6 max-w-7xl mx-auto'
        >
          {packages.map((pkg, i) => (
            <HoverCard key={i}>
              <HoverCardTrigger asChild>
                <MotionCard
                  className={`relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col overflow-hidden border-0 ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-[#12293F] to-[#1a3a5c] text-white transform hover:scale-105'
                      : 'bg-white hover:bg-slate-50/80 backdrop-blur-sm hover:scale-105'
                  }`}
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  // whileHover={{ y: -8 }}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className='absolute -top-[-10px] left-1/2 transform -translate-x-1/2 z-10'>
                      <div className='bg-amber-400 text-[#12293F] px-2 py-1 rounded-full text-xs xl:text-sm font-bold flex items-center gap-1'>
                        <Star className='w-3 h-3 fill-current' />
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <CardContent className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col space-y-6 flex-grow'>
                      {/* Tier Label */}
                      <div className='text-center mt-3'>
                        <span
                          className={`text-sm font-medium tracking-wider ${
                            pkg.popular ? 'text-blue-200' : 'text-slate-500'
                          }`}
                        >
                          {pkg.tier}
                        </span>
                        <h3
                          className={`text-2xl font-bold mt-1 ${pkg.popular ? 'text-white' : 'text-[#12293F]'}`}
                        >
                          {pkg.title}
                        </h3>
                      </div>

                      {/* Price */}
                      <div className='text-center'>
                        <p
                          className={`text-2xl font-bold ${pkg.popular ? 'text-white' : 'text-[#12293F]'}`}
                        >
                          {pkg.price}
                        </p>
                      </div>

                      {/* Description */}
                      {pkg.description && (
                        <p
                          className={`text-sm leading-relaxed text-center ${
                            pkg.popular ? 'text-blue-100' : 'text-slate-600'
                          }`}
                        >
                          {pkg.description}
                        </p>
                      )}

                      {/* Features */}
                      <ul className='space-y-3'>
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className='flex items-center space-x-3'>
                            <CircleCheck
                              className={`w-5 h-5 flex-shrink-0 ${
                                pkg.popular ? 'text-emerald-300' : 'text-emerald-600'
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${pkg.popular ? 'text-white' : 'text-slate-700'}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link href='/' className='mt-8'>
                      <Button
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          pkg.popular
                            ? 'bg-white text-[#12293F] hover:bg-slate-100 hover:shadow-lg'
                            : 'bg-[#12293F] text-white hover:bg-[#1a3a5c] hover:shadow-lg'
                        }`}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </MotionCard>
              </HoverCardTrigger>
            </HoverCard>
          ))}

          {/* Additional Services Card */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <MotionCard
                className='rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col bg-gradient-to-br from-slate-800 to-[#12293F] text-white overflow-hidden hover:scale-105'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                custom={packages.length}
                // whileHover={{ y: -8 }}
              >
                <CardContent className='flex flex-col justify-between h-full'>
                  <div className='flex flex-col space-y-6 flex-grow'>
                    <div className='text-center'>
                      <span className='text-sm font-medium tracking-wider text-blue-200'>
                        Premium Add-ons
                      </span>
                      <h3 className='text-2xl font-bold mt-1 text-white'>ADDITIONAL SERVICES</h3>
                    </div>

                    <div className='bg-white/10 rounded-2xl p-6'>
                      <ul className='space-y-4'>
                        {additionalServices.map((service, idx) => (
                          <li key={idx} className='flex items-start space-x-3'>
                            <CircleCheck className='w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5' />
                            <span className='text-sm font-medium text-white leading-relaxed'>
                              {service}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href='/' className='mt-8'>
                    <Button className='w-full py-3 rounded-xl font-semibold bg-white text-[#12293F] hover:bg-slate-100 hover:shadow-lg transition-all duration-300'>
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </MotionCard>
            </HoverCardTrigger>
          </HoverCard>
        </motion.div>
      </div>
    </div>
  );
}
