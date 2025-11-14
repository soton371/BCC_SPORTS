'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { format } from 'date-fns';
import Loading from '@/components/loading';
import NotFound from '@/app/not-found';
import NoDataFound from './NoDataFound';

interface Column<T = any> {
  key: string;
  title: string;
  value?: (row: T) => React.ReactNode; // optional custom render function
}

interface DynamicTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  tableClassName?: string;
  headClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  loading?: boolean;
}

export default function DynamicTable<T extends Record<string, any>>({
  data,
  columns,
  tableClassName,
  headClassName,
  rowClassName,
  cellClassName,
  loading,
}: DynamicTableProps<T>) {
  if (data && data?.length === 0 && !loading) {
    return <NoDataFound />;
  }
  return (
    <div className='overflow-x-auto'>
      <Table className={`${tableClassName || ''}`}>
        {loading ? (
          <div className='text-center h-60 flex justify-center'>
            <Loading />
          </div>
        ) : (
          <>
            <TableHeader className={headClassName}>
              <TableRow className={rowClassName}>
                <TableHead className={cellClassName}>SL.</TableHead>
                {columns.map((col) => (
                  <TableHead key={col.key} className={cellClassName}>
                    {col.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row, idx) => (
                <TableRow key={idx} className={rowClassName}>
                  <TableCell className={cellClassName}>{idx + 1}</TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={cellClassName}>
                      {col.value
                        ? col.value(row) // use custom render if provided
                        : col.key.includes('time') && row[col.key]
                          ? format(new Date(row[col.key]), 'dd-MMM-yyyy hh:mm a')
                          : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );
}
