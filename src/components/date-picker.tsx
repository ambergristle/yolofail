'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/button';

type DatePickerTriggerProps = { 
  value: Date | undefined 
}

const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(({ 
  value, 
  ...props 
}, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'w-[200px] justify-start text-left font-normal',
        !value && 'text-muted-foreground',
      )}
      {...props}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value ? format(value, 'PP') : <span>{'Pick a date'}</span>}
    </Button>
  );
});

export {
  DatePickerTrigger,
};
