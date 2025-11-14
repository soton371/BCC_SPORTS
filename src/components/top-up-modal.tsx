'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from './ui/separator';
import { DialogProps } from '@radix-ui/react-dialog';

type Props = DialogProps & {
  title?: string;
};

const TopUpModal = (props: Props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        tabIndex={-1}
        onInteractOutside={(e) => e.preventDefault()}
        className='max-h-[80vh] overflow-x-hidden overflow-y-auto'
      >
        <DialogHeader>
          <DialogTitle>{props.title || ''}</DialogTitle>
        </DialogHeader>
        <Separator />

        {props?.children}
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
