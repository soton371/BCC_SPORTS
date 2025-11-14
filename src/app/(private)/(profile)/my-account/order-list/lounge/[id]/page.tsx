import React from 'react';
import LoungeDetails from '../../_component/LoungeDetails';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <LoungeDetails orderId={id} />;
};

export default Page;
