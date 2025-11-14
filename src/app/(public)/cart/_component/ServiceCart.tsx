'use client';
import { useGetAvailableServicesQuery } from '@/lib/APIs/common-api';
import {
  resetBaggageForm,
  resetLoungeBooking,
  resetMeetAndAssistForm,
} from '@/lib/redux/slice/bookFormSlice';
import { RootState } from '@/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { FaBowlFood, FaRegTrashCan } from 'react-icons/fa6';
import { GrLounge } from 'react-icons/gr';
import { LuBaggageClaim } from 'react-icons/lu';
import { Card } from '../../../../components/ui/card';
import TermsAndConditionAllow from '@/components/homepage/TermsAndConditionAllow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';
import ChosePaymentMethod from '@/components/homepage/ChosePaymentMethod';
const ServiceCart = ({
  loading,
  setPaymentMethod,
}: {
  loading: boolean;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAvailableServicesQuery();
  /* --------------cart data from redux------------- */
  const meetAndAssistBooking = useSelector(
    (state: RootState) => state.bookForm.meetAndAssistBooking,
  );
  const loungeBooking = useSelector((state: RootState) => state.bookForm.loungeBooking);
  const baggageBooking = useSelector((state: RootState) => state.bookForm.baggageBooking);

  console.log(meetAndAssistBooking);
  const mergedMeetAndAssist = data?.data?.meetAndAssist
    ?.filter((item) => Number(item.category_id) === Number(meetAndAssistBooking?.category_id))
    ?.map((item) => ({
      price: item.discount_price,
      title: `Meet And Assist (${item.category_name}) - ${meetAndAssistBooking?.service_type}`,
      adult: meetAndAssistBooking?.total_travelers || 0,
      icon: <FaBowlFood fontSize={28} className='text-primary' />,
      key: item.category_id,
    }));

  const lounge =
    loungeBooking?.isBook === 'yes'
      ? {
          price: data?.data?.lounge?.discount_price || 0,
          title: `Lounge Access`,
          adult: loungeBooking?.total_travelers || 0,
          icon: <GrLounge fontSize={28} className='text-primary' />,
          key: 'lounge',
        }
      : null;

  const baggageWrapping =
    baggageBooking?.isBook === 'yes'
      ? {
          price: data?.data?.baggageWrapping?.discount_price || 0,
          title: `Baggage Wrapping`,
          adult: baggageBooking?.total_baggages || 0,

          icon: <LuBaggageClaim fontSize={28} className='text-primary' />,
          key: 'baggage',
        }
      : null;

  // Merge all items properly into array
  const totalBookingInfo = [
    ...(mergedMeetAndAssist || []),
    ...(lounge ? [lounge] : []),
    ...(baggageWrapping ? [baggageWrapping] : []),
  ];

  const handleRemove = (key: string | number) => {
    if (key === 'lounge') dispatch(resetLoungeBooking());
    else if (key === 'baggage') dispatch(resetBaggageForm({}));
    else dispatch(resetMeetAndAssistForm({}));
  };

  if (totalBookingInfo?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center p-6'>
        <div className='relative w-80 h-80 mb-6'>
          <Image
            alt='Empty Cart'
            src='/images/cart_empty.jpg'
            fill
            className='object-contain'
            priority
          />
        </div>
        <h2 className='text-2xl font-semibold mb-2 text-gray-700'>No Services Added Yet</h2>
        <p className='text-gray-500 mb-6'>
          You haven’t added travelers to any service. Start booking by selecting a service.
        </p>
        <button
          onClick={() => router?.push('/')}
          className=' cursor-pointer bg-primary text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300'
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className=''>
      <h1 className='text-3xl font-bold mb-4 text-primary'>Service Cart</h1>
      <div className='flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0'>
        {/* Cart Items */}
        <Card className='lg:w-2/3 w-full px-1 md:px-10'>
          {!isLoading ? (
            totalBookingInfo?.map((cartData) => (
              <div className='space-y-5' key={cartData?.key}>
                <div
                  key={cartData.key}
                  className='bg-white p-2 md:p-6 lg:p-8 rounded-2xl  border border-gray-200 hover:shadow-xl transition-all'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start space-x-4'>
                      <div className='w-12 h-12 flex-shrink-0 flex items-center justify-center'>
                        {cartData.icon}
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-primary'>{cartData.title}</h3>
                        <p className='text-sm text-gray-500'>
                          {cartData.key === 'baggage' ? `Total Baggage` : 'Adults'} :{' '}
                          {cartData.adult}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <span className='text-lg font-bold text-primary'>৳ {cartData.price}</span>
                      <button
                        className='text-gray-400 hover:text-red-500 transition cursor-pointer'
                        onClick={() => handleRemove(cartData.key)}
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center items-center h-full'>
              <Loading />
            </div>
          )}
        </Card>

        {/* Summary Section */}
        <div className='lg:w-1/3 w-full'>
          <div className='bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-xl border border-gray-100 min-h-[400px] flex flex-col justify-between'>
            <div>
              <h2 className='text-2xl font-bold mb-6 text-primary'>Order Summary</h2>

              <div className='space-y-4'>
                {totalBookingInfo?.map((item) => (
                  <div key={item.key} className='flex justify-between items-center'>
                    <div>
                      <h3 className='text-md font-semibold text-primary'>{item.title}</h3>
                      <p className='text-sm text-gray-500'>
                        {' '}
                        {item.key === 'baggage' ? `Total Baggage` : 'Adults'} : {item.adult}
                      </p>
                    </div>
                    <span className='text-lg font-bold text-primary'>
                      ৳ {item.price * item.adult}
                    </span>
                  </div>
                ))}
              </div>

              <hr className='my-6 border-gray-200' />
              <div className='flex justify-between items-center mb-4'>
                <p className='text-lg font-semibold text-secondary'>Total</p>
                <p className='text-2xl font-bold text-primary'>
                  BDT{' '}
                  {totalBookingInfo
                    .reduce((sum, item) => sum + item.price * item.adult, 0)
                    .toFixed()}
                </p>
              </div>
              <ChosePaymentMethod setPaymentMethod={setPaymentMethod} />
            </div>

            {/* Terms & Checkout */}
            <div className='mt-2'>
              <TermsAndConditionAllow />
              <button
                disabled={loading}
                className='w-full py-3 bg-primary mt-2 cursor-pointer hover:bg-secondary text-white font-bold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5'
              >
                Checkout {loading ? '...' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCart;
