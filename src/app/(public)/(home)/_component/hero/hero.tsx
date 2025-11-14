import { Suspense } from 'react';
import HeroLoadingBackground from './HeroLoadingBackground';
import HeroBackgroundAndTitle from './HeroBackgroundAndTitle';
import { fetchRequest } from '@/lib/APIs/fetchApis';

export type ServicePricing = {
  regular_price: number;
  discount_price: number;
};

export type MeetAndAssistCategory = {
  category_id: number;
  category_name: string;
  category_features: string;
  regular_price: number;
  discount_price: number;
};

export type ServiceData = {
  lounge: ServicePricing;
  baggageWrapping: ServicePricing;
  meetAndAssist: MeetAndAssistCategory[];
};

export type TAllServices = ServiceData;

export default async function HeroWrapper() {
  const res = await fetchRequest<TAllServices>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public/b2c/available-services`,
  );

  return (
    <section className='md:relative md:h-[600px] lg:min-h-[750px]'>
      <Suspense fallback={<HeroLoadingBackground />}>
        <HeroBackgroundAndTitle data={res?.data} />
      </Suspense>

      {/* <div className='relative z-20 pt-16 md:pt-20 lg:pt-28'>
        <HeroBooking data={res?.data} />
      </div> */}
    </section>
  );
}
