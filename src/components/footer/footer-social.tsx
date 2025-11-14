import Image from 'next/image';
import Link from 'next/link';
import linkedIn from '../../../public/icon/linkedin.png';
import facebook from '../../../public/icon/facebook.png';
import instagram from '../../../public/icon/instagram_408707.png';
type Props = {};

const FooterSocial = (props: Props) => {
  const social_links = [
    {
      logo: facebook,
    },
    // {
    //   logo: instagram,
    // },

    // {
    //   logo: linkedIn,
    // },
  ];

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-3'>
        {social_links?.map(({ logo }, key) => (
          <Link href={''} target='_blank' key={key}>
            <Image
              src={logo}
              alt='Social logo'
              key={key}
              rel='noopener noreferrer'
              aria-label='Social'
              width={30}
              height={30}
              // className='rounded-full'
            />
          </Link>
        ))}
      </div>
      <div>
        <div className='flex flex-col gap-1 text-sm '>
          <div>
            <p className='font-medium text-lg'>254/4, WEST MANIKDI</p>
            <p className='text-sm'>CANTONMENT, DHAKA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSocial;
