'use client'; // ✅ required in Next.js App Router

import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Choose Your Service',
    description:
      'Select from our range of premium airport services including transfers, lounge access, and more.',
  },
  {
    step: '02',
    title: 'Book Online',
    description:
      'Complete your booking through our secure platform with instant confirmation and flexible payment options.',
  },
  {
    step: '03',
    title: 'Relax & Enjoy',
    description:
      'Our professional team takes care of everything while you enjoy a stress-free airport experience.',
  },
];

const HowItWorks = () => {
  return (
    <section id='how-it-works' className='py-20 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Heading */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>How It Works</h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Getting premium airport services has never been easier. Follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className='grid md:grid-cols-3 gap-12 relative'>
          {/* Connection line (desktop only) */}
          <div className='hidden md:block absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-primary opacity-30'></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className='text-center relative'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} // ✅ runs when visible
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Step Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-full text-2xl font-bold mb-6 shadow-elegant [text-shadow:_0_1px_2px_rgba(0,0,0,0.6)]'
              >
                {step.step}
              </motion.div>

              {/* Title */}
              <h3 className='text-2xl font-bold text-foreground mb-4'>{step.title}</h3>

              {/* Description */}
              <p className='text-muted-foreground leading-relaxed'>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
