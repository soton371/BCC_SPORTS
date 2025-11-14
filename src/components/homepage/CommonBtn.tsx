import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import clsx from 'clsx';

type CommonBtnProps = {
  btn_name?: string;
  disabled?: boolean;
};

const CommonBtn = ({ btn_name = 'Add to Cart', disabled = false }: CommonBtnProps) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={clsx(
        'sm:mt-4 w-full flex items-center justify-center gap-2 py-1 sm:py-3 font-semibold rounded-lg transition-colors',
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
          : 'cursor-pointer bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90',
      )}
    >
      <FaShoppingCart />
      {btn_name || 'Add to Cart'}
    </button>
  );
};

export default CommonBtn;
