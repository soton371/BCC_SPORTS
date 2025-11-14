import Image from 'next/image';
import Link from 'next/link';

export default async function HeaderLogo() {
  return (
    <Link href='/' className='flex items-center gap-3'>
      <div className='relative p-1 rounded-md'>
        <Image
          src={''}
          alt={'Logo'}
          width={190}
          height={55}
          className='h-8 lg:h-12 object-contain transition-opacity duration-300'
          priority
        />
      </div>
    </Link>
  );
}
