import { ServiceData } from './hero';
import HeroBackgroundClient from './HeroBackgroundClient';

export default async function HeroBackgroundAndTitle({ data }: { data: ServiceData | undefined }) {
  return <HeroBackgroundClient data={data} />;
}
