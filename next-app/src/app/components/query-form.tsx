'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';



import { Calendar } from '@/components/calendar';
import { DatePickerTrigger } from '@/components/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form';
import { Input } from '@/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { queryTimeSeries } from '../actions/query-time-series';
import { SubmitButton } from './submit-button';


const ZQueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
});

type QueryFormValues = z.infer<typeof ZQueryFormValues>;

type QueryFormProps = {
  symbol: string;
  amount: number;
  buyDate: Date;
}

export const QueryForm = (props: QueryFormProps) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [queryState, queryAction] = useFormState(queryTimeSeries, props);
  console.log(queryState);

  const formProps = useForm({
    resolver: zodResolver(ZQueryFormValues),
    defaultValues: queryState,
  });

  return (
    <Form {...formProps}>
      <form 
        ref={formRef}
        className="flex flex-row items-end space-x-4"
        noValidate
        onSubmit={formProps.handleSubmit(() => {
          formRef.current?.submit();
        })}
      >
        <FormField
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{'symbol'}</FormLabel>
              <FormControl>
                <Input placeholder={'GME'} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="buyDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{'buy date'}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <DatePickerTrigger value={field.value} />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <SubmitButton size="icon">
          <MagnifyingGlassIcon />
        </SubmitButton>
      </form>
    </Form>
  );
};

export default QueryForm;
