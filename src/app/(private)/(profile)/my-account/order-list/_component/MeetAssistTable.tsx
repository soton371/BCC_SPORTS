'use client';

import React from 'react';
import DynamicTable from './DynamicTable';
import { useGetMeetAndAssistOrderQuery } from '@/lib/APIs/common-api';
import { MeetAssistOrder } from '../_type/orderlist';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';
export default function MeetAssistTable() {
  const { data, isLoading } = useGetMeetAndAssistOrderQuery();

  const columns = [
    { key: 'order_no', title: 'Order No' },
    { key: 'service_type', title: 'Service Type' },
    { key: 'status', title: 'Status' },
    { key: 'total_amount', title: 'Total Amount' },
    { key: 'total_travelers', title: 'Travelers' },
    { key: 'reporting_time', title: 'Reporting Time' },
    { key: 'flight_time', title: 'Flight Time' },
    {
      key: 'KEY',
      title: 'Action',
      value: (col: any) => (
        <Link href={`/my-account/order-list/meet-assist/${col?.id}`}>
          <FaEye fontSize={18} />{' '}
        </Link>
      ),
    },
  ];

  return (
    <>
      <DynamicTable<MeetAssistOrder>
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
      />
    </>
  );
}
