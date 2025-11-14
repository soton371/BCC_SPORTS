import React from 'react';
import DynamicTable from './DynamicTable';
import { LoungeOrder } from '../_type/orderlist';
import { useGetLoungeOrderQuery } from '@/lib/APIs/common-api';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
const loungeColumns = [
  { key: 'order_no', title: 'Order No' },
  { key: 'contact_phone', title: 'Contact Phone' },
  { key: 'flight_time', title: 'Flight Time' },
  { key: 'reporting_time', title: 'Reporting Time' },
  { key: 'total_amount', title: 'Total Amount' },
  { key: 'status', title: 'Status' },
  {
    key: 'KEY',
    title: 'Action',
    value: (col: any) => (
      <Link href={`/my-account/order-list/lounge/${col?.id}`}>
        <FaEye fontSize={18} />{' '}
      </Link>
    ),
  },
];

const LoungeTable = () => {
  const { data, isLoading } = useGetLoungeOrderQuery();
  return (
    <div>
      <DynamicTable<LoungeOrder>
        data={data?.data || []}
        columns={loungeColumns}
        loading={isLoading}
      />
    </div>
  );
};

export default LoungeTable;
