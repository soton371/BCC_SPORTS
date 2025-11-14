import Image from 'next/image';
import { cn } from '@/lib/utils';
import { logo, logoWithbg } from '@/lib/CONSTANT';

interface AppImageProps {
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string; // allow overriding wrapper
  priority?: boolean;
  withBg?: boolean;
}

export const CommLogo: React.FC<AppImageProps> = ({
  alt = 'Logo',
  width = 130,
  height = 50,
  className,
  priority = false,
  withBg,
}) => {
  return (
    <Image
      src={withBg ? logoWithbg : logo}
      alt={alt}
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
      className={cn(
        'object-contain transition-opacity duration-300 rounded-md',
        className, // optional override for image itself
      )}
      priority={priority}
    />
  );
};

export default CommLogo;
