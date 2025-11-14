import Link from 'next/link';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import FooterLogoInfo from './footer-logo-info';
import FooterSocial from './footer-social';
import FooterCopyRight from './footer-copyright';

export default async function Footer() {
  const contactInfo = {
    Explore: [
      { id: 1, text: 'About Us', href: '/about-us' },
      { id: 2, text: 'Contact Us', href: '/contact-us' },
      { id: 3, text: 'Privacy Policy', href: '/privacy-policy' },
      { id: 4, text: 'Terms & Conditions', href: '/terms-and-conditions' },
      { id: 5, text: 'Trade License', href: '/trade&license' },
      // { id: 6, text: 'Blog', href: '/blog' },
      // { id: 7, text: 'Payment Method', href: '/payment-method' },
    ],
    Services: [
      { id: 1, text: 'Meet & Assist', href: '/' },
      { id: 3, text: 'Lounge', href: '/' },
      { id: 4, text: 'Baggage Wrapping', href: '/' },
    ],
  };

  return (
    <footer className='footer-header text-white relative z-20'>
      <section className='container px-4 md:mx-10 py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
          <Suspense fallback={<FooterLogoInfoLoading />}>
            <FooterLogoInfo />
          </Suspense>

          {Object.entries(contactInfo).map(([title, links]) => (
            <div key={title}>
              <h4 className='text-lg font-semibold mb-4'>{title}</h4>
              <ul className='space-y-2 text-sm'>
                {links?.map((link) => {
                  if (link.href === '/trade&license') {
                    return (
                      <li key={link.id}>
                        {' '}
                        <a
                          href='/doc/trade-license.pdf' // PDF path inside public folder
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:text-gray-200 hover:underline transition'
                        >
                          {link.text}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          className='hover:text-gray-200 hover:underline transition'
                        >
                          {link.text}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ))}

          <div>
            <h4 className='text-lg font-semibold mb-4'>Social Media & Address</h4>
            <Suspense fallback={<FooterSocialLoading />}>
              <FooterSocial />
            </Suspense>
          </div>
        </div>

        <div className='mt-14 pt-6 border-t border-white text-sm text-white flex flex-col md:flex-row justify-between items-center gap-4'>
          <Suspense fallback={''}>
            <FooterCopyRight />
          </Suspense>
        </div>
      </section>
    </footer>
  );
}

const FooterSocialLoading = () => {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton
          key={idx}
          circle
          width={30}
          height={30}
          className='rounded-full'
          baseColor='#232732'
          highlightColor='#d8dee8'
        />
      ))}

      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className='flex flex-col gap-1 text-sm'>
          <Skeleton width={100} height={20} baseColor='#232732' highlightColor='#d8dee8' />
          <Skeleton width={150} height={15} baseColor='#232732' highlightColor='#d8dee8' />
        </div>
      ))}
    </div>
  );
};

const FooterLogoInfoLoading = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <Skeleton circle width={50} height={55} baseColor='#232732' highlightColor='#d8dee8' />

        <Skeleton width={120} height={25} baseColor='#232732' highlightColor='#d8dee8' />
      </div>

      <div className='flex flex-col gap-1'>
        {Array.from({ length: 2 }).map((_, idx) => (
          <Skeleton
            key={idx}
            width={150}
            height={15}
            baseColor='#232732'
            highlightColor='#d8dee8'
          />
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        {Array.from({ length: 2 }).map((_, idx) => (
          <Skeleton
            key={idx}
            width={120}
            height={15}
            baseColor='#232732'
            highlightColor='#d8dee8'
          />
        ))}
      </div>
    </div>
  );
};
