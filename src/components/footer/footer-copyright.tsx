import Image from 'next/image';

const FooterCopyRight = async () => {
  return (
    <>
      <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 w-full'>
        <p className='text-center sm:text-left'>
          &copy; {new Date().getFullYear()}. All rights reserved. Designed & Developed by M360ICT
        </p>
        <div className='w-full sm:w-auto'>
          <Image
            alt=''
            width={550}
            height={60}
            className='w-full sm:w-auto ml-0 sm:ml-2'
            src={'/images/sslcommerz-banner.png'}
          />
        </div>
      </div>
    </>
  );
};

export default FooterCopyRight;
