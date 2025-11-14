import { Inbox } from 'lucide-react';

export default function NoDataFound() {
  return (
    <div className='flex flex-col items-center justify-center py-24 text-center px-4'>
      <div className='bg-muted/20 rounded-full p- mb-'>
        <Inbox className='h-16 w-16 text-muted-foreground' />
      </div>
      <h2 className='text-2xl font-semibold mb-2'>No Data Found</h2>
      <p className='text-muted-foreground max-w-sm mb-6'>
        It looks like there’s nothing to display right now.
      </p>
    </div>
  );
}
