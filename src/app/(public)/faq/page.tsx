'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import meetAssistImg from '../../../../public/images/airport-staff-with-luggage-in-uniform.png';
import loungeImg from '../../../../public/images/luxury-airport-lounge-interior-with-seating.png';
import baggageImg from '../../../../public/images/baggagewrap.jpg';
import pickupImg from '../../../../public/images/pickup1.png';

const faqs = [
  {
    question: 'Who are we?',
    answer:
      'Sohi  is a premium airport service provider offering Meet & Assist, Lounges, Baggage Wrapping, and Pickup/Drop services to make your travel seamless and enjoyable.',
    image: null,
  },
  {
    question: 'What is Meet & Assist service?',
    answer:
      'Our professional airport staff assists you from arrival to departure, including fast-track through check points, luggage handling, and more.',
    image: meetAssistImg,
  },
  {
    question: 'What are our lounges?',
    answer:
      'We offer luxury airport lounges with comfortable seating, complimentary Wi-Fi, gourmet meals, and kid-friendly areas to relax before your flight.',
    image: loungeImg,
  },
  {
    question: 'Baggage Wrapping services?',
    answer:
      'Protect your luggage with our secure wrapping services to ensure safety during transit.',
    image: baggageImg,
  },
  {
    question: 'Pickup & Drop services?',
    answer:
      'Safe, reliable, and comfortable rides to and from the airport with professional chauffeurs.',
    image: pickupImg,
  },
];

export default function AboutUsFAQ() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className='relative bg-cover bg-center h-[30vh] flex items-center justify-center'
        style={{ backgroundImage: "url('/images/bg_airport.jpg')" }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative text-center px-6'>
          <h1 className='text-4xl md:text-6xl font-extrabold text-white mb-4'>
            Frequently Asked Questions
          </h1>
          <p className='text-lg md:text-2xl text-white'>
            Your guide to smooth, stress-free, and premium airport experiences.
          </p>
        </div>
      </section>

      {/* FAQ / Accordion Section */}
      <section className='py-20 px-6 bg-sky-50'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-[#132A40] mb-10 text-center'>
            Frequently Asked Questions
          </h2>

          <Accordion type='single' collapsible className='space-y-4'>
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className='bg-white rounded-2xl shadow-lg'
              >
                <AccordionTrigger className='px-6 py-4 text-left hover:bg-sky-100 transition-colors font-semibold text-lg'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='px-6 py-4 flex flex-col md:flex-row items-center gap-6 text-gray-700'>
                  {faq.image && (
                    <div className='w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden'>
                      <Image src={faq.image} alt={faq.question} fill className='object-cover' />
                    </div>
                  )}
                  <p className='text-base md:text-lg flex-1'>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
