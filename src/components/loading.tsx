import { Loader } from 'lucide-react';
const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <Loader className='animate-spin size-10 p-0 m-0' strokeWidth={1} />
    </div>
  );
};

export default Loading;
