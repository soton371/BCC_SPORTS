import CommLogo from '../ui/CommLogo';

type Props = {};

const FooterLogoInfo = async (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <CommLogo withBg />
      <div className='flex flex-col gap-1'>
        <a className='text-sm'>info@sohiaviation.com</a>
      </div>

      <div className='flex flex-col gap-1'>
        <a className='text-sm '>+8801930303201, +8801930303207 +8801930303208</a>
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-sm'>Trade License No:</p>

        <a
          href='/doc/trade-license.pdf' // PDF path inside public folder
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-secondary hover:underline transition underline underline-offset-4'
        >
          TRAD/DNCC/005293/2025
        </a>
      </div>
    </div>
  );
};
export default FooterLogoInfo;
