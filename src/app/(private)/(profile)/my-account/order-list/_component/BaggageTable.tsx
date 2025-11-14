import React from 'react';
import DynamicTable from './DynamicTable';
import { BaggageOrder, LoungeOrder } from '../_type/orderlist';
import { useGetBaggaeWrappingOrderQuery, useGetLoungeOrderQuery } from '@/lib/APIs/common-api';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa6';
const loungeColumns = [
  { key: 'order_no', title: 'Order No' },
  { key: 'contact_email', title: 'Contact Email' },
  { key: 'contact_phone', title: 'Contact Phone' },
  { key: 'status', title: 'Status' },
  { key: 'total_amount', title: 'Total Amount' },
  {
    key: 'KEY',
    title: 'Action',
    value: (col: any) => (
      <Link href={`/my-account/order-list/baggage/${col?.id}`}>
        <FaEye fontSize={18} />{' '}
      </Link>
    ),
  },
];

const BaggageTable = () => {
  const { data } = useGetBaggaeWrappingOrderQuery();
  return (
    <div>
      <DynamicTable<BaggageOrder> data={data?.data || []} columns={loungeColumns} />
    </div>
  );
};

export default BaggageTable;
