import React, { useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';

export function allKeyValuesExist(obj: Record<string, any>): boolean {
  return Object.values(obj).every((val) => val !== '' && val !== null && val !== undefined);
}
export const inheritData = ({ data1, form, data2 }: { data1: any; data2?: any; form: any }) => {
  const isExistData1 = allKeyValuesExist(data1 || {});
  const isExistData2 = allKeyValuesExist(data2 || {});
  const fromData = isExistData1 ? data1 : isExistData2 ? data2 : null;
  if (fromData) {
    Object.entries(fromData).forEach(([key, value]) => {
      form.setValue(`${key}` as any, value);
    });
  }
};
const CopyInformation = ({ data1, form, data2 }: { data1: any; data2?: any; form: any }) => {
  useEffect(() => {
    if (data1 || data2) {
      inheritData({ data1: data1, form, data2: data2 });
    }
  }, []);
  return (
    <div className='flex items-center justify-end'>
      <button
        type='button'
        className='flex items-center gap-2 text-xs sm:text-sm sm:mb-2 cursor-pointer'
        onClick={() => inheritData({ data1: data1, form, data2: data2 })}
      >
        <FaCopy className='' /> Copy Info.
      </button>
    </div>
  );
};

export default CopyInformation;
