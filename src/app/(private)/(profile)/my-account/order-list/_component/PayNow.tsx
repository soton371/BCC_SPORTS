'use client';

import React, { useState } from 'react';
import { useCallbikashPayMutation, useCallSSLPayMutation } from '@/lib/APIs/common-api';
import { Button } from '@/components/ui/button';
import { showToast } from '@/components/toast-utils';
import { CreditCard, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const PayNow = ({ status, invoice_id }: { invoice_id: number; status?: string }) => {
  const [callSSL, { isLoading: isLoadssl }] = useCallSSLPayMutation();
  const [callBikash, { isLoading: isLoadBikash }] = useCallbikashPayMutation();
  const [paymentMethod, setPaymentMethod] = useState<'ssl' | 'bkash' | ''>('');

  const handleConfirm = async () => {
    if (!paymentMethod) {
      showToast('error', 'Please select a payment method first.');
      return;
    }

    try {
      if (paymentMethod === 'ssl') {
        const sslPayload = {
          isMobile: false,
          invoice_id: invoice_id,
        };
        const sslRes = await callSSL(sslPayload).unwrap();

        if (sslRes?.success && sslRes?.data?.redirect_url) {
          window.location.href = sslRes.data.redirect_url;
        } else {
          showToast('error', 'Payment initialization failed.');
        }
      }

      if (paymentMethod === 'bkash') {
        const sslPayload = {
          isMobile: false,
          invoice_id: invoice_id,
        };
        const sslRes = await callBikash(sslPayload).unwrap();

        if (sslRes?.success && sslRes?.data?.redirect_url) {
          window.location.href = sslRes.data.redirect_url;
        } else {
          showToast('error', 'Payment initialization failed.');
        }
      }
    } catch (error) {
      console.error('Payment failed:', error);
      showToast('error', 'Payment failed. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center py-6'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {status === 'Unpaid' && (
            <Button
              disabled={isLoadssl || isLoadBikash}
              className='group relative flex items-center gap-2 px-6 py-3 text-lg font-semibold 
              rounded-xl bg-gradient-to-r from-[#162e44] to-[#345779] 
              hover:from-[#1B3550] hover:to-[#254868] 
              text-white shadow-lg shadow-[#12293F]/30 
              transition-all duration-300 hover:scale-105 hover:shadow-[#12293F]/50'
            >
              {isLoadssl || isLoadBikash ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                  Pay Now
                </>
              )}
            </Button>
          )}
        </AlertDialogTrigger>

        <AlertDialogContent className='rounded-2xl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-xl font-bold'>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Please select a payment method to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className=''>
            <RadioGroup
              onValueChange={(val) => setPaymentMethod(val as 'ssl' | 'bkash')}
              value={paymentMethod}
              className='flex flex-col'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='bkash' id='bkash' />
                <Label htmlFor='bkash'>
                  {' '}
                  <Image
                    alt='Bkash'
                    width={80}
                    height={28}
                    src='/images/Bkash.png'
                    className='object-contain'
                  />
                </Label>
              </div>{' '}
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='ssl' id='ssl' />
                <Label htmlFor='ssl'>
                  <Image
                    alt='SSL Commerz'
                    width={120}
                    height={40}
                    src='/images/sslcommaerz.png'
                    className='object-contain'
                  />
                </Label>
              </div>
            </RadioGroup>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className='rounded-lg'>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={paymentMethod ? false : true}
              className='rounded-lg bg-[#345779] hover:bg-[#254868]'
            >
              {isLoadssl || isLoadBikash ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Processing...
                </>
              ) : (
                'Confirm'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PayNow;
