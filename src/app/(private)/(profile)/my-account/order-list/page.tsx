'use client';
import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import MeetAssistTable from './_component/MeetAssistTable';
import LoungeTable from './_component/LoungeTable';
import BaggageTable from './_component/BaggageTable';

export default function OrderList() {
  return (
    <div className='p-0'>
      <h1 className='text-2xl font-semibold mb-6'>Order List</h1>
      <TabsPrimitive.Root defaultValue='meet-assist' className='w-full'>
        <TabsPrimitive.List className='flex gap-4 border-b border-gray-200 mb-6'>
          <TabsPrimitive.Trigger
            value='meet-assist'
            className='px-4 py-2 text-sm font-medium text-primary hover:text-secondary data-[state=active]:border-b-2 data-[state=active]:border-primary'
          >
            Meet & Assist
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            value='lounge'
            className='px-4 py-2 text-sm font-medium text-primary hover:text-secondary data-[state=active]:border-b-2 data-[state=active]:border-primary'
          >
            Lounge
          </TabsPrimitive.Trigger>
          <TabsPrimitive.Trigger
            value='baggage'
            className='px-4 py-2 text-sm font-medium text-primary hover:text-secondary data-[state=active]:border-b-2 data-[state=active]:border-primary'
          >
            Baggage Wrapping
          </TabsPrimitive.Trigger>
        </TabsPrimitive.List>

        <TabsPrimitive.Content
          value='meet-assist'
          className='rounded-lg bg-gray-50 border border-gray-200'
        >
          <MeetAssistTable />
        </TabsPrimitive.Content>

        <TabsPrimitive.Content
          value='lounge'
          className='p-4 rounded-lg bg-gray-50 border border-gray-200'
        >
          <LoungeTable />
        </TabsPrimitive.Content>

        <TabsPrimitive.Content
          value='baggage'
          className='p-4 rounded-lg bg-gray-50 border border-gray-200'
        >
          <BaggageTable />
        </TabsPrimitive.Content>
      </TabsPrimitive.Root>
    </div>
  );
}
