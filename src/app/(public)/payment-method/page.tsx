import { Card, CardContent } from '@/components/ui/card';
import { API_ENDPOINTS } from '@/lib/APIs/endpoint-list';
import { fetchRequest } from '@/lib/APIs/fetchApis';
import { getImageLink } from '@/lib/helper';
import { Landmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface IPaymentMethod {
  id: number;
  account_name: string;
  account_number: string;
  branch: string;
  routing_no: string;
  status: boolean;
  swift_code: string;
  bank_name: string;
  bank_type: string;
  bank_logo: string;
}

const page = async () => {
  const { data } = await fetchRequest<IPaymentMethod[]>(API_ENDPOINTS.PAYMENT_METHOD);
  const activeAccounts = data?.filter((account) => account.status) || [];
  const inactiveAccounts = data?.filter((account) => !account.status) || [];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        {/* Header */}
        <div className='mb-16'>
          <h1 className='text-3xl font-semibold text-gray-900 mb-3'>Payment Methods</h1>
          <p className='text-gray-600 text-lg'>
            Select a verified payment method to proceed with your transaction.
          </p>
        </div>

        {/* Active Payment Methods */}
        {activeAccounts.length > 0 && (
          <div className='mb-12'>
            <h2 className='text-xl font-medium text-gray-900 mb-8'>Available Methods</h2>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {activeAccounts.map((account) => (
                <Link href={`my-account/deposit/add?account=${account.id}`} key={account.id}>
                  <Card className='group bg-white border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer'>
                    <CardContent className='p-6'>
                      {/* Bank Header */}
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center'>
                          {account.bank_logo ? (
                            <Image
                              src={getImageLink(account.bank_logo)}
                              alt={account.bank_name}
                              width={32}
                              height={32}
                              className='rounded object-contain'
                            />
                          ) : (
                            <Landmark className='w-6 h-6 text-gray-400' />
                          )}
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>{account.bank_name}</h3>
                          <p className='text-sm text-gray-500 capitalize'>{account.bank_type}</p>
                        </div>
                      </div>

                      {/* Account Details */}
                      <div className='space-y-3 text-sm'>
                        <div>
                          <span className='text-gray-500'>Account Name</span>
                          <p className='font-medium text-gray-900'>{account.account_name}</p>
                        </div>

                        <div>
                          <span className='text-gray-500'>Account Number</span>
                          <p className='font-mono text-gray-900'>{account.account_number}</p>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <span className='text-gray-500'>Branch</span>
                            <p className='text-gray-900'>{account.branch}</p>
                          </div>
                          <div>
                            <span className='text-gray-500'>Routing</span>
                            <p className='font-mono text-gray-900'>{account.routing_no}</p>
                          </div>
                        </div>

                        {account.swift_code && (
                          <div>
                            <span className='text-gray-500'>SWIFT Code</span>
                            <p className='font-mono text-gray-900'>{account.swift_code}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Payment Methods */}
        {inactiveAccounts.length > 0 && (
          <div className='mb-12'>
            <h2 className='text-xl font-medium text-gray-500 mb-8'>Temporarily Unavailable</h2>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {inactiveAccounts.map((account) => (
                <Card key={account.id} className='bg-gray-50 border border-gray-200'>
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center opacity-50'>
                        {account.bank_logo ? (
                          <Image
                            src={getImageLink(account.bank_logo)}
                            alt={account.bank_name}
                            width={32}
                            height={32}
                            className='rounded object-contain grayscale'
                          />
                        ) : (
                          <Landmark className='w-6 h-6 text-gray-300' />
                        )}
                      </div>
                      <div>
                        <h3 className='font-medium text-gray-500'>{account.bank_name}</h3>
                        <p className='text-sm text-gray-400 capitalize'>{account.bank_type}</p>
                      </div>
                    </div>

                    <p className='text-sm text-gray-400'>Currently unavailable</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className='border-t border-gray-200 pt-8'>
          <p className='text-sm text-gray-500 text-center max-w-2xl mx-auto'>
            All payment methods are verified and regularly monitored for security. Contact support
            if you need assistance with your transaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
