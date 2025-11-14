import React, { Dispatch, SetStateAction } from 'react';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';

type Props = {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
};

const IAgree = ({ isChecked, setIsChecked }: Props) => {
  return (
    <div>
      <div className='flex items-center space-x-2 bg-background p-1 rounded-md cursor-pointer'>
        <Checkbox id='terms' checked={isChecked} onCheckedChange={(val) => setIsChecked(!!val)} />
        <label
          htmlFor='terms'
          className='text-sm text-muted-foreground leading-snug cursor-pointer'
        >
          I agree with the{' '}
          <Link href='/terms-and-conditions' className='underline text-primary'>
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link href='/privacy-policy' className='underline text-primary'>
            Privacy Policy
          </Link>
        </label>
      </div>
    </div>
  );
};

export default IAgree;
