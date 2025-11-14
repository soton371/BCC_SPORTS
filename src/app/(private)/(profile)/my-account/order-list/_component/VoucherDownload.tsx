import { imageHostLink } from '@/request';
import type { InvoiceDetails, ServiceOrder } from '../_type/orderlist';
import { format } from 'date-fns';
import Image from 'next/image';
import QRCode from 'react-qr-code';
function VoucherDownload({ order }: { order: InvoiceDetails | undefined }) {
  return (
    <div className='min-h-screen bg-gray-50 print:p-0 print:bg-white'>
      <div className='max-w-4xl mx-auto print:max-w-full'>
        <div className='bg-white rounded-lg px-6 shadow-sm border print:shadow-none print:border-none'>
          {/* Header */}
          <div className='flex py-4 justify-between items-start'>
            <div className='flex items-center gap-3'>
              <div className='text-2xl font-bold text-'>
                <Image
                  alt='logo'
                  src={`${'/logo/logoair.png'}`}
                  priority
                  loading='eager'
                  width={100}
                  height={50}
                />
              </div>
            </div>
            <div className='text-right text-sm text-gray-600'>
              <p className='font-medium'>Order No: {order?.invoice_no || 'DR1027'}</p>
              <p>
                Date:{' '}
                {order?.created_at
                  ? format(new Date(order?.created_at), 'dd MMM yyyy | HH:mm aa')
                  : '28 Sep 2025 | 03:11 PM'}
              </p>
            </div>
          </div>

          {/* Service Details */}
          <div className=' border p-2 mb-3 bg-gray-50 border-gray-100 rounded-lg'>
            <h2 className='text-lg font-semibold text- mb-4'>Service Details</h2>

            <div className='grid grid-cols-2 gap-6 text-sm'>
              {/* Left Column */}
              <div className='space-y-3'>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Airport</p>
                  <p className='font-medium text-gray-800'>
                    {order?.airport_name || 'Hazrat Shahjalal International Airport'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Flight Time</p>
                  <p className='font-medium text-gray-800'>
                    {order?.flight_time
                      ? format(new Date(order.flight_time), 'dd MMM yyyy | hh:mm a')
                      : '01 Oct 2025 | 04:10 PM'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Contact Email</p>
                  <p className='font-medium text-'>{order?.contact_email || 'Degdes@gmail.on'}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-3'>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Flight Number</p>
                  <p className='font-medium text-gray-800'>{order?.flight_number || '3659'}</p>
                </div>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Reporting Time</p>
                  <p className='font-medium text-gray-800'>
                    {order?.reporting_time
                      ? format(new Date(order.reporting_time), 'dd MMM yyyy | hh:mm a')
                      : '01 Oct 2025 | 12:10 PM'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-medium text-gray-500'>Contact Phone</p>
                  <p className='font-medium text-gray-800'>{order?.contact_phone || '01454487'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Orders */}
          <div className=' border-b mb-3 border-gray-100'>
            <h2 className='text-lg font-semibold text- mb-2'>Service Orders</h2>
            <div className='space-y-4'>
              {order?.meetAndAssistOrder && (
                <ServiceCard title='Meet & Assist' provider={order?.meetAndAssistOrder} />
              )}
              {order?.loungeOrder && <ServiceCard title='Lounge' provider={order?.loungeOrder} />}
              {order?.baggageOrder && (
                <ServiceCard title='Luggage Wrapping' provider={order?.baggageOrder} />
              )}
            </div>
          </div>

          {/* Policies & Terms */}
          <div className='py-3'>
            <div className='flex justify-between items-start gap-6'>
              {/* Left Section - Policies */}
              <div className='flex-1'>
                <h2 className='text-lg font-semibold text- mb-4'>Policies & Terms</h2>
                <div className='space-y-2 text-sm text-gray-600'>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <p>Privacy: Your information is protected and not shared without consent.</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <p>Cancellation: No refunds for cancellations after 24 hours.</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <p>Terms: Follow airport rules. Not liable for security/customs delays.</p>
                  </div>
                  <div className='flex items-start gap-2'>
                    <div className='w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <p>Refunds: processed within 5-7 business days.</p>
                  </div>
                </div>
              </div>

              {/* Right Section - QR Code */}
              <div className='flex flex-col items-center justify-center text-center'>
                <div className='w-24 h-24 mb-2'>
                  <QRCode
                    size={96}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={xorCipher(String(order?.id), 'x7F#p2Q9!zR4@kL1*M8&vE5%cT3&bN6^')}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <p className='text-sm font-semibold text-gray-700 tracking-wide uppercase'>
                  Verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Redesigned service card component
function ServiceCard({ title, provider }: { title: string; provider: ServiceOrder }) {
  return (
    <div className='flex items-center justify-between p-4 border border-gray-50 bg-white rounded-lg shadow-xs'>
      {/* Left Section */}
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-semibold text-'>{title}</h3>
        <div className='text-sm text-gray-700 space-y-1'>
          <p>{provider.supplier_address}</p>
          <p>
            Tel: <span className='text-gray-900'>{provider.supplier_phone_number}</span>
          </p>
          <p>
            Email: <span className='text-'>{provider.supplier_email}</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-3 text-right'>
        <Image
          alt='logo'
          src={`${imageHostLink}/${provider?.supplier_logo}`}
          priority
          loading='eager'
          width={80}
          height={40}
          className='rounded-md border border-gray-200 bg-gray-50'
        />
        <div className='text-sm'>
          <p className='font-semibold text-gray-900'>{provider?.supplier_org_name}</p>
          <p className='text-gray-600'>{provider?.supplier_name}</p>
        </div>
      </div>
    </div>
  );
}

export default VoucherDownload;

// Cipher function
function xorCipher(text: string, key: string, isDecrypt = false): string {
  if (!key) throw new Error('Key is required');
  let result = '';

  if (isDecrypt) {
    for (let i = 0; i < text.length; i += 2) {
      const encryptedChar = Number.parseInt(text.substr(i, 2), 16);
      const keyChar = key.charCodeAt((i / 2) % key.length);
      const decryptedChar = encryptedChar ^ keyChar;
      result += String.fromCharCode(decryptedChar);
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const encryptedChar = textChar ^ keyChar;
      result += encryptedChar.toString(16).padStart(2, '0');
    }
  }
  return result;
}
