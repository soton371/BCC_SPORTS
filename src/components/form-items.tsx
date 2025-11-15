'use client';

import { Input } from '@/components/ui/input';
import { Controller, FieldValues, get, useController, useFormContext } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { format, formatISO, isDate } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import {
  FormInputProps,
  FormInputTextAreaProps,
  FormRadioProps,
  FormSelectProps,
} from '@/type/formItem.interface';

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = 'Enter your input',
  disabled,
  readOnly,
  className,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel className='w-full'>
            {disabled ? <span className='text-[#838383]'>{label}</span> : label}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                readOnly={readOnly}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                {...field}
                className={cn('pr-10', error && 'border-red-500', className)}
              />
              {type === 'password' && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <Eye className='h-4 w-4 text-gray-500' />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormSelectInput<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  options,
  className,
  disabled,
}: FormSelectProps<T>) {
  const { formState, control } = useFormContext<T>();

  return (
    <FormField
      // disabled
      control={control}
      name={name}
      render={({ field }) => {
        console.log({ value: field.value });
        return (
          <FormItem className='relative'>
            <FormLabel>{label}</FormLabel>
            <Select
              disabled={disabled}
              key={field.value}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className={cn('w-full', className)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
          </FormItem>
        );
      }}
    />
  );
}

export function FormDateInput<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  disabled,
  onChange,
}: FormInputProps<T> & { onChange?: (date?: Date) => void }) {
  const [month, setMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear + 40 - 1950 }, (_, i) => 1950 + i);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild className='bg-white'>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? format(field.value, 'yyyy-MM-dd') : <span>{placeholder}</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={(e) => {
                  onChange && onChange(e);
                  setOpen(false);
                  field.onChange(e);
                }}
                disabled={disabled}
                initialFocus
                month={month}
                onMonthChange={setMonth}
                components={{
                  Caption: () => {
                    return (
                      <div className='flex justify-between items-center w-full px-1 pt-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => {
                            const prev = new Date(month);
                            if (prev.getMonth() === 0) {
                              // If January, set to December of previous year
                              prev.setFullYear(prev.getFullYear() - 1);
                              prev.setMonth(11);
                            } else {
                              // Otherwise just decrement month
                              prev.setMonth(prev.getMonth() - 1);
                            }
                            setMonth(prev);
                          }}
                        >
                          <ChevronLeft className='h-4 w-4' />
                        </Button>

                        <div className='flex items-center gap-1'>
                          <Select
                            value={month.getMonth().toString()}
                            onValueChange={(value) => {
                              const newMonth = new Date(month);
                              newMonth.setMonth(Number.parseInt(value));
                              setMonth(newMonth);
                            }}
                          >
                            <SelectTrigger className='h-7 border-0 shadow-none text-xs font-normal'>
                              <SelectValue>
                                <span className='font-semibold text-lg'>
                                  {months[month.getMonth()]}
                                </span>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((monthName, index) => (
                                <SelectItem
                                  key={monthName}
                                  value={index.toString()}
                                  className='text-xs'
                                >
                                  {monthName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={month.getFullYear().toString()}
                            onValueChange={(value) => {
                              const newMonth = new Date(month);
                              newMonth.setFullYear(Number.parseInt(value));
                              setMonth(newMonth);
                            }}
                          >
                            <SelectTrigger className='h-7 border-0 shadow-none text-xs font-normal'>
                              <SelectValue className='border-0'>
                                <span className='font-semibold'>{month.getFullYear()}</span>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className='max-h-96'>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()} className='text-xs'>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => {
                            const next = new Date(month);
                            if (next.getMonth() === 11) {
                              // If December, set to January of next year
                              next.setFullYear(next.getFullYear() + 1);
                              next.setMonth(0);
                            } else {
                              // Otherwise just increment month
                              next.setMonth(next.getMonth() + 1);
                            }
                            setMonth(next);
                          }}
                        >
                          <ChevronRight className='h-4 w-4' />
                        </Button>
                      </div>
                    );
                  },
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormRadioInput<T extends FieldValues>({ name, label, options }: FormRadioProps<T>) {
  const { formState, control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className='flex flex-row items-center space-x-2'
            >
              {options.map((item, index) => (
                <FormItem key={index} className='space-y-0'>
                  <FormControl>
                    <RadioGroupItem value={item.value} id={item.value} />
                  </FormControl>
                  <FormLabel htmlFor={item.value}>{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function FormInputTextArea<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  disabled,
  className,
}: FormInputTextAreaProps<T>) {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel className='w-full'>
            {disabled ? <span className='text-[#838383]'>{label}</span> : label}
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Textarea
                placeholder={placeholder}
                {...field}
                className={cn('pr-10', error && 'border-red-500', className)}
              />
            </div>
          </FormControl>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

type TimePickerProps<T extends FieldValues> = {
  name: any;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export function DateTimePicker<T extends FieldValues>({
  name,
  label,
  placeholder = 'Enter your input',
  disabled,
  onChange,
}: FormInputProps<T> & { onChange?: (date?: Date) => void }) {
  const [open, setOpen] = useState(false);
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const fieldValue = watch(name) as Date | undefined;
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string) => {
    if (!fieldValue) return;

    const newDate = new Date(fieldValue);
    if (type === 'hour') {
      const currentHours = newDate.getHours();
      const isPM = currentHours >= 12;
      newDate.setHours((parseInt(value) % 12) + (isPM ? 12 : 0));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value));
    } else if (type === 'ampm') {
      const currentHours = newDate.getHours();
      if (value === 'PM' && currentHours < 12) newDate.setHours(currentHours + 12);
      if (value === 'AM' && currentHours >= 12) newDate.setHours(currentHours - 12);
    }

    console.log(newDate);
    // setValue(name, newDate, { shouldValidate: true });
    onChange?.(newDate);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {field.value ? (
                  format(field.value, 'MM/dd/yyyy hh:mm aa')
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <div className='sm:flex'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(date) => {
                    console.log(date, field, '----------------');
                    field.onChange(date);
                    onChange?.(date);
                  }}
                  initialFocus
                />

                <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {hours.reverse().map((hour) => (
                        <Button
                          key={hour}
                          size='icon'
                          variant={
                            field.value && field.value.getHours() % 12 === hour % 12
                              ? 'default'
                              : 'ghost'
                          }
                          className='sm:w-full shrink-0 aspect-square'
                          onClick={() => handleTimeChange('hour', hour.toString())}
                        >
                          {hour}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>

                  <ScrollArea className='w-64 sm:w-auto'>
                    <div className='flex sm:flex-col p-2'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <Button
                          key={minute}
                          size='icon'
                          variant={
                            field.value && field.value.getMinutes() === minute ? 'default' : 'ghost'
                          }
                          className='sm:w-full shrink-0 aspect-square'
                          onClick={() => {
                            handleTimeChange('minute', minute.toString());
                          }}
                        >
                          {minute}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' className='sm:hidden' />
                  </ScrollArea>

                  <ScrollArea>
                    <div className='flex sm:flex-col p-2'>
                      {['AM', 'PM'].map((ampm) => (
                        <Button
                          key={ampm}
                          size='icon'
                          variant={
                            field.value &&
                            ((ampm === 'AM' && field.value.getHours() < 12) ||
                              (ampm === 'PM' && field.value.getHours() >= 12))
                              ? 'default'
                              : 'ghost'
                          }
                          className='sm:w-full shrink-0 aspect-square'
                          onClick={() => handleTimeChange('ampm', ampm)}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage className='absolute -bottom-4.5 right-0 text-xs' />
        </FormItem>
      )}
    />
  );
}

export function TimePicker({
  label,
  name,
  placeholder,
  rules,
  disabled,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
}) {
  const { control } = useFormContext<any>();
  const [isOpen, setIsOpen] = useState(false);

  // useController is the bridge between your UI and RHF's state
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  // This is the single source of truth. We derive our date object from the form's value.
  const selectedDate = isDate(value) ? value : value ? new Date(value) : undefined;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (newDate: Date | undefined) => {
    // If a new date is selected, merge it with the current time from the form state.
    if (newDate) {
      const newDateTime = new Date(newDate);
      if (selectedDate) {
        // Keep the current hour and minute from the previously selected date.
        newDateTime.setHours(selectedDate.getHours());
        newDateTime.setMinutes(selectedDate.getMinutes());
      } else {
        // If no date was selected before, initialize the time to the current time.
        const now = new Date();
        newDateTime.setHours(now.getHours());
        newDateTime.setMinutes(now.getMinutes());
      }
      // Tell React Hook Form about the new value.
      onChange(formatISO(newDateTime));
    } else {
      // If the user unselects the date, explicitly set the form value to undefined.
      onChange(undefined);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', newValue: string) => {
    // If no date is selected, start with the current date and time.
    let newDate = selectedDate ? new Date(selectedDate) : new Date();

    if (type === 'hour') {
      newDate.setHours(parseInt(newValue));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(newValue));
    }
    // Tell React Hook Form about the new value.
    onChange(formatISO(newDate));
  };

  const handlePopoverChange = (open: boolean) => {
    setIsOpen(open);
    // If the popover is closing, run the onBlur handler
    if (!open) {
      onBlur();
    }
  };

  return (
    <FormItem className='w-full relative'>
      <FormLabel className='w-full'>
        {disabled ? (
          <span className='text-[#838383]'>{label}</span>
        ) : (
          <span className={`${error?.message ? 'text-red-600' : ''}`}>{label}</span>
        )}
      </FormLabel>
      <Popover open={isOpen} onOpenChange={handlePopoverChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {/* The UI now directly uses selectedDate, which is derived from the form value */}
            {selectedDate ? (
              format(selectedDate, 'MM/dd/yyyy HH:mm')
            ) : (
              <span>{placeholder || 'MM/DD/YYYY HH:mm'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='sm:flex'>
            <Calendar
              mode='single'
              selected={selectedDate} // <-- Now correctly receives the latest value
              onSelect={handleDateSelect}
              initialFocus
            />
            <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getHours() === hour ? 'default' : 'ghost'
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getMinutes() === minute ? 'default' : 'ghost'
                      }
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <FormMessage className='absolute -bottom-4.5 right-0 text-xs'>{error.message}</FormMessage>
      )}
    </FormItem>
  );
}
export function CustomTimePicker({
  label,
  name,
  placeholder,
  rules,
  disabled,
}: {
  name: string;
  label: string | React.ReactNode;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
}) {
  const { control } = useFormContext<any>();
  const [isOpen, setIsOpen] = useState(false);

  // useController is the bridge between your UI and RHF's state
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  // This is the single source of truth. We derive our date object from the form's value.
  const selectedDate = isDate(value) ? value : value ? new Date(value) : undefined;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (newDate: Date | undefined) => {
    // If a new date is selected, merge it with the current time from the form state.
    if (newDate) {
      const newDateTime = new Date(newDate);
      if (selectedDate) {
        // Keep the current hour and minute from the previously selected date.
        newDateTime.setHours(selectedDate.getHours());
        newDateTime.setMinutes(selectedDate.getMinutes());
      } else {
        // If no date was selected before, initialize the time to the current time.
        const now = new Date();
        newDateTime.setHours(now.getHours());
        newDateTime.setMinutes(now.getMinutes());
      }
      // Tell React Hook Form about the new value.
      onChange(formatISO(newDateTime));
    } else {
      // If the user unselects the date, explicitly set the form value to undefined.
      onChange(undefined);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', newValue: string) => {
    // If no date is selected, start with the current date and time.
    let newDate = selectedDate ? new Date(selectedDate) : new Date();

    if (type === 'hour') {
      newDate.setHours(parseInt(newValue));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(newValue));
    } else if (type === 'ampm') {
      const currentHours = newDate.getHours();
      newDate.setHours(newValue === 'PM' ? currentHours + 12 : currentHours - 12);
    }
    // Tell React Hook Form about the new value.
    onChange(formatISO(newDate));
  };

  const handlePopoverChange = (open: boolean) => {
    setIsOpen(open);
    // If the popover is closing, run the onBlur handler
    if (!open) {
      onBlur();
    }
  };

  return (
    <FormItem className='w-full relative'>
      <FormLabel className='w-full'>
        {disabled ? (
          <span className='text-[#838383]'>{label}</span>
        ) : (
          <span className={`${error?.message ? 'text-red-600' : ''}`}>{label}</span>
        )}
      </FormLabel>
      <Popover open={isOpen} onOpenChange={handlePopoverChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {/* The UI now directly uses selectedDate, which is derived from the form value */}
            {selectedDate ? (
              format(selectedDate, 'MM/dd/yyyy HH:mm aa')
            ) : (
              <span>{placeholder || 'MM/DD/YYYY HH:mm aa'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='flex'>
            {/* Calendar on the left */}
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />

            {/* Right side with hours, minutes, AM/PM */}
            <div className='flex h-[300px]'>
              {/* Hours */}
              <ScrollArea className=''>
                <div className='flex flex-col'>
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getHours() === hour ? 'default' : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* Minutes */}
              <ScrollArea className=''>
                <div className='flex flex-col p-1'>
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getMinutes() === minute ? 'default' : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* AM/PM */}
              <ScrollArea className=''>
                <div className='flex flex-col p-1'>
                  {['AM', 'PM'].map((ampm) => (
                    <Button
                      key={ampm}
                      size='icon'
                      variant={
                        selectedDate &&
                        ((ampm === 'AM' && selectedDate.getHours() < 12) ||
                          (ampm === 'PM' && selectedDate.getHours() >= 12))
                          ? 'default'
                          : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('ampm', ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <FormMessage className='absolute -bottom-4.5 right-0 text-xs'>{error.message}</FormMessage>
      )}
    </FormItem>
  );
}

export function FormInputForMobile<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = 'Enter your input',
  disabled,
  readOnly,
  className,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className='w-full relative gap-0'>
          <FormLabel className='w-full'>
            {disabled ? <span className='text-[#838383] text-xs'>{label}</span> : label}{' '}
            <FormMessage className=' right-0 text-[9px]' />
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                readOnly={readOnly}
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                {...field}
                className={cn('p', error && 'border-red-500', className)}
              />
              {type === 'password' && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-gray-500' />
                  ) : (
                    <Eye className='h-4 w-4 text-gray-500' />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export function CustomTimePickerForMobile({
  label,
  name,
  placeholder,
  rules,
  disabled,
}: {
  name: string;
  label: string | React.ReactNode;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
}) {
  const { control } = useFormContext<any>();
  const [isOpen, setIsOpen] = useState(false);

  // useController is the bridge between your UI and RHF's state
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control, rules });

  // This is the single source of truth. We derive our date object from the form's value.
  const selectedDate = isDate(value) ? value : value ? new Date(value) : undefined;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (newDate: Date | undefined) => {
    // If a new date is selected, merge it with the current time from the form state.
    if (newDate) {
      const newDateTime = new Date(newDate);
      if (selectedDate) {
        // Keep the current hour and minute from the previously selected date.
        newDateTime.setHours(selectedDate.getHours());
        newDateTime.setMinutes(selectedDate.getMinutes());
      } else {
        // If no date was selected before, initialize the time to the current time.
        const now = new Date();
        newDateTime.setHours(now.getHours());
        newDateTime.setMinutes(now.getMinutes());
      }
      // Tell React Hook Form about the new value.
      onChange(formatISO(newDateTime));
    } else {
      // If the user unselects the date, explicitly set the form value to undefined.
      onChange(undefined);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', newValue: string) => {
    // If no date is selected, start with the current date and time.
    let newDate = selectedDate ? new Date(selectedDate) : new Date();

    if (type === 'hour') {
      newDate.setHours(parseInt(newValue));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(newValue));
    } else if (type === 'ampm') {
      const currentHours = newDate.getHours();
      newDate.setHours(newValue === 'PM' ? currentHours + 12 : currentHours - 12);
    }
    // Tell React Hook Form about the new value.
    onChange(formatISO(newDate));
  };

  const handlePopoverChange = (open: boolean) => {
    setIsOpen(open);
    // If the popover is closing, run the onBlur handler
    if (!open) {
      onBlur();
    }
  };

  return (
    <FormItem className='w-full relative gap-0'>
      <FormLabel className='w-full'>
        {disabled ? (
          <span className='text-[#838383]'>{label}</span>
        ) : (
          <span className={`${error?.message ? 'text-red-600' : ''}`}>{label}</span>
        )}{' '}
        {error && <FormMessage className='text-[9px]'>{error.message}</FormMessage>}
      </FormLabel>
      <Popover open={isOpen} onOpenChange={handlePopoverChange}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal overflow-hidden p-0',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon fontSize={5} className='h-4 w-4' />
            {/* The UI now directly uses selectedDate, which is derived from the form value */}
            {selectedDate ? (
              <span className='text-xs'>{format(selectedDate, 'MM/dd/yyyy HH:mm aa')}</span>
            ) : (
              <span className='text-xs'>{placeholder || 'MM/DD/YYYY HH:mm'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='flex'>
            {/* Calendar on the left */}
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />

            {/* Right side with hours, minutes, AM/PM */}
            <div className='flex h-[300px]'>
              {/* Hours */}
              <ScrollArea className=''>
                <div className='flex flex-col'>
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getHours() === hour ? 'default' : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* Minutes */}
              <ScrollArea className=''>
                <div className='flex flex-col p-1'>
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={
                        selectedDate && selectedDate.getMinutes() === minute ? 'default' : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {/* AM/PM */}
              <ScrollArea className=''>
                <div className='flex flex-col p-1'>
                  {['AM', 'PM'].map((ampm) => (
                    <Button
                      key={ampm}
                      size='icon'
                      variant={
                        selectedDate &&
                        ((ampm === 'AM' && selectedDate.getHours() < 12) ||
                          (ampm === 'PM' && selectedDate.getHours() >= 12))
                          ? 'default'
                          : 'ghost'
                      }
                      className='w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('ampm', ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}

export function DateTimePicker24h({
  label,
  name,
  placeholder,
  rules,
  disabled,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
}) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours();
        newDate.setHours(value === 'PM' ? currentHours + 12 : currentHours - 12);
      }
      setDate(newDate);
    }
  };

  console.log(date, '---------------------------------');

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'MM/dd/yyyy hh:mm aa') : <span>MM/DD/YYYY hh:mm aa</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar mode='single' selected={date} onSelect={handleDateSelect} initialFocus />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={date && date.getHours() % 12 === hour % 12 ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex flex-col p-2'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size='icon'
                    variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className=''>
              <div className='flex flex-col p-2'>
                {['AM', 'PM'].map((ampm) => (
                  <Button
                    key={ampm}
                    size='icon'
                    variant={
                      date &&
                      ((ampm === 'AM' && date.getHours() < 12) ||
                        (ampm === 'PM' && date.getHours() >= 12))
                        ? 'default'
                        : 'ghost'
                    }
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('ampm', ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function TimePickers({
  label,
  name,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<any>();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    } else {
      onChange(undefined);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours(parseInt(value));
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
    }
  };

  return (
    <FormItem className='w-full relative'>
      <FormLabel>{label}</FormLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'MM/dd/yyyy hh:mm') : <span>MM/DD/YYYY hh:mm</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <div className='sm:flex'>
            <Calendar mode='single' selected={date} onSelect={handleDateSelect} initialFocus />
            <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size='icon'
                      variant={date && date.getHours() === hour ? 'default' : 'ghost'}
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
              <ScrollArea className='w-64 sm:w-auto'>
                <div className='flex sm:flex-col p-2'>
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size='icon'
                      variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                      className='sm:w-full shrink-0 aspect-square'
                      onClick={() => handleTimeChange('minute', minute.toString())}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='sm:hidden' />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}

export function TimePickerField({
  label,
  name,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Time is required' }}
      render={({ field: { value, onChange } }) => (
        <FormItem className='w-full relative'>
          <Popover>
            <FormLabel>{label}</FormLabel>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !value && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {value
                  ? format(value, 'MM/dd/yyyy hh:mm aa')
                  : placeholder || 'MM/DD/YYYY hh:mm aa'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              {/* calendar + time selection UI */}
              <Calendar
                mode='single'
                selected={value}
                onSelect={(d) => d && onChange(d)}
                initialFocus
              />
              {/* rest of hour/minute/ampm buttons */}
            </PopoverContent>
          </Popover>
          {errors[name] && <p className='text-sm text-red-500'>{String(errors[name]?.message)}</p>}
        </FormItem>
      )}
    />
  );
}
