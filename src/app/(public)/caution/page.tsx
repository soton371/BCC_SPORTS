import LoginWarning from '@/components/login-warning';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div className='container my-5'>
      <LoginWarning redirect='/' />
    </div>
  );
};

export default page;
