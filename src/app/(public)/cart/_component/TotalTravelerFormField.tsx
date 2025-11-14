'use client';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormInput } from '@/components/form-items';
import { IMainForm } from './MultiServiceTravelerForm';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  serviceIndex: number;
  serviceName: string;
}

const TotalTravelerFormField: React.FC<Props> = ({ serviceIndex }) => {
  const { control } = useFormContext<IMainForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `services.${serviceIndex}.travelers`, // path to array
  });

  return (
    <div className='grid grid-cols-1 gap-4'>
      {fields?.map((field, index) => (
        <div key={field.id} className='border p-3 rounded grid grid-cols-1 gap-4 relative'>
          <FormInput
            name={`services.${serviceIndex}.travelers.${index}.name`}
            type='text'
            label='Name'
          />
          <FormInput
            name={`services.${serviceIndex}.travelers.${index}.passport_number`}
            type='text'
            label='Passport Number'
          />

          {/* Buttons aligned center right */}
          {/* <div className='flex gap-1 justify-end'>
            {fields.length > 1 && (
              <Button
                type='button'
                variant='destructive'
                size='sm'
                className='w-fit flex items-center gap-1'
                onClick={() => remove(index)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
            <Button
              type='button'
              size='sm'
              className='w-fit flex items-center gap-1'
              onClick={() =>
                append({
                  name: '',
                  passport_number: '',
                })
              }
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TotalTravelerFormField;
