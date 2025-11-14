import BaggageDetails from '../../_component/BaggageDetails';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <BaggageDetails orderId={id} />;
};

export default Page;
