'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type DatePickerTriggerProps = { 
  value: Date | undefined;
  className?: string;
}

const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(({ 
  value,
  className,
  ...props 
}, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn(
        'min-w-[200px] justify-start text-left font-normal',
        !value && 'text-muted-foreground',
      )}
      {...props}
    >
      <CalendarIcon className="size-4 mr-2" />
      {value ? format(value, 'PP') : <span>{'Pick a date'}</span>}
    </Button>
  );
});

export {
  DatePickerTrigger,
};
