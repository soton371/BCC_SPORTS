'use client';
import Link from 'next/link';

export default function SslcommerzSuccessPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-sky-50 to-indigo-50 flex items-center justify-center p-6'>
      <div className='max-w-lg w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden text-center px-8 py-12'>
        {/* Success Icon */}
        <div className='mx-auto w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg'>
          <svg className='w-14 h-14 text-white' viewBox='0 0 24 24' fill='none' aria-hidden>
            <path
              d='M20 6L9 17l-5-5'
              stroke='currentColor'
              strokeWidth='2.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className='mt-6 text-3xl font-semibold text-gray-800'>Congratulations!</h1>
        <p className='mt-2 text-base text-gray-600'>we've received your payment.</p>
        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/my-account/order-list'
            className='flex-1 inline-flex items-center justify-center rounded-lg bg-gray-800 text-white px-6 py-3 font-semibold shadow-md hover:opacity-95'
          >
            Go to Order List
          </Link>
        </div>

        {/* Footer */}
        <div className='mt-10 text-xs text-gray-500'>
          <p>Securely processed by SSLCommerz</p>
        </div>
      </div>
    </div>
  );
}
