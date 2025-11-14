import React from 'react';
import MeetOrderDetails from '../../_component/MeetOrderDetails';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <MeetOrderDetails orderId={id} />;
};

export default Page;
