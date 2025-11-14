'use client';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
} from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa6';
import {
  useGetMeetAndAssistOrderDetailsQuery,
  useLazyGetInvoiceOrderDetailsQuery,
} from '@/lib/APIs/common-api';
import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { imageHostLink } from '@/request';
import VoucherDownload from './VoucherDownload';
import { useReactToPrint } from 'react-to-print';
import Loading from '@/components/loading';
import PayNow from './PayNow';
import Image from 'next/image';

const MeetOrderDetails = ({ orderId }: { orderId: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Voucher',
  });
  const { data: order, isLoading, isSuccess } = useGetMeetAndAssistOrderDetailsQuery(orderId);
  const [invoice_order, { isLoading: inLoad, data: inData }] = useLazyGetInvoiceOrderDetailsQuery();
  const data = order?.data;

  useEffect(() => {
    if (isSuccess && order?.data?.invoice_id) {
      invoice_order(String(order?.data?.invoice_id));
    }
  }, [isSuccess, order, invoice_order]);

  if (isLoading || inLoad) {
    return (
      <Card className='shadow-md rounded-sm'>
        <div className='p-6 flex justify-center'>
          <Loading />
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className='flex justify-end py-2'>
        <span
          className='cursor-pointer'
          onClick={data?.invoice_status === 'Paid' ? handlePrint : undefined}
        >
          <FaPrint fontSize={25} color={data?.invoice_status === 'Paid' ? '' : 'gray'} />
        </span>
      </div>

      <Card className='shadow-md rounded-sm'>
        {isLoading ? (
          <div className='h-40 flex justify-center items-center'>
            <Loading />
          </div>
        ) : (
          <>
            <div className='flex justify-between align-middle  px-5'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                <div className='h-12 w-20'>
                  <Image src={'/logo/logoair.png'} width={100} height={50} alt='' />
                </div>
              </div>

              <div>
                <PayNow invoice_id={data?.invoice_id as number} status={data?.status} />
              </div>
            </div>

            <CardContent className='space-y-6'>
              {/* Order Summary */}
              <div>
                <h3 className='font-semibold mb-2'>Order Summary</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                  <div>
                    <span className='font-medium'>Order No.:</span> {data?.order_no}
                  </div>
                  <div>
                    <span className='font-medium'>Invoice:</span> {data?.invoice_no}
                  </div>
                  <div>
                    <span className='font-medium'>Amount:</span>{' '}
                    <span className='text-green-600 font-semibold'>{data?.total_amount}</span>
                  </div>
                  <div>
                    <span className='font-medium'>Discount:</span> {data?.discount}
                  </div>
                  <div>
                    <span className='font-medium'>Order Status:</span>{' '}
                    <Badge variant='outline'>{data?.status}</Badge>
                  </div>
                  <div>
                    <span className='font-medium'>Invoice Status:</span>{' '}
                    <Badge variant='outline'>{data?.invoice_status}</Badge>
                  </div>
                  <div>
                    <span className='font-medium'>Service Type :</span>{' '}
                    <Badge variant='outline'>Meet And Assist ({data?.service_type})</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Flight Info */}
              <div>
                <h3 className='font-semibold mb-2'>Flight Details</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaPlaneDeparture className='text-gray-500' />
                    <span className='font-medium'>Flight Number :</span> {data?.flight_number}
                  </div>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaCalendarAlt className='text-gray-500' />
                    <span className='font-medium'>
                      {data?.service_type === 'Arrival' ? 'Arrival time :' : 'Departure time:'}{' '}
                    </span>
                    {data?.flight_time
                      ? format(new Date(data.flight_time), 'dd-MMM-yyyy hh:mm a')
                      : 'N/A'}
                  </div>

                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaTag className='text-gray-500' />
                    <span className='font-medium'>Reporting time :</span>
                    {data?.reporting_time
                      ? format(new Date(data.reporting_time), 'dd-MMM-yyyy hh:mm a')
                      : 'N/A'}
                  </div>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaMapMarkerAlt className='text-gray-500' />
                    {data?.airport_name} ({data?.airport_iata_code}) – {data?.airport_city_name}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Info */}
              <div>
                <h3 className='font-semibold mb-2'>Contact Info</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaEnvelope className='text-gray-500' /> {data?.contact_email}
                  </div>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <FaPhone className='text-gray-500' /> {data?.contact_phone}
                  </div>
                </div>
              </div>

              {data?.travelers?.length && (
                <div>
                  <Separator />
                  <h3 className='font-semibold mb-2'>Travelers</h3>
                  <ul className='space-y-2'>
                    {data?.travelers?.map((traveler) => (
                      <li
                        key={traveler.id}
                        className='flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-md px-3 py-2 text-sm gap-2'
                      >
                        <div className='flex items-center gap-2 flex-wrap'>
                          <FaUser className='text-gray-500' /> {traveler.name}
                        </div>

                        <Badge variant='outline'>
                          Passport No. : {traveler.passport_number || 'N/A'}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data?.tracking?.length && (
                <div>
                  <Separator />
                  <h3 className='font-semibold mb-2'> Order Status Tracking</h3>
                  <ul className='space-y-2'>
                    {data?.tracking?.map((track, index) => (
                      <li
                        key={track.id}
                        className='flex flex-col items-start justify-between border rounded-md px-3 py-2 text-sm gap-2'
                      >
                        <div className='flex items-center gap-2 flex-wrap'>
                          {index + 1}. status: {track?.status}
                        </div>
                        <div>Details : {track?.details || 'N/A'}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </>
        )}
        {/* Supplier Header */}

        {/* Hidden for Print */}
      </Card>
      <div className='hidden'>
        <div ref={contentRef}>
          <VoucherDownload order={inData?.data} />
        </div>
      </div>
    </>
  );
};

export default MeetOrderDetails;
