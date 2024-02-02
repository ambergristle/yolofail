'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DatePickerTrigger } from '@/components/ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeSeriesSearchParams } from '@/types';

type PropTypes = {
  defaultValues: QueryFormValues;
  onSubmit: (params: TimeSeriesSearchParams) => void;
  isLoading: boolean;
}

const QueryForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: PropTypes) => {

  const formProps = useForm({
    resolver: zodResolver(ZQueryFormValues),
    values: defaultValues,
  });

  return (
    <Form {...formProps}>
      <form
        className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 md:space-x-4"
        noValidate
        onSubmit={formProps.handleSubmit(({ buyDate, ...data }) => {
          return onSubmit({ 
            buyDate: buyDate.toISOString().split('T')[0],
            ...data,
          });
        }, console.error)}
      >
        <FormField
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>{'symbol'}</FormLabel>
              <FormControl>
                <Input placeholder={'GME'} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex w-full items-end space-x-2 md:space-x-4">
          <FormField
            name="buyDate"
            render={({ field }) => (
              <FormItem className="flex grow flex-col">
                <FormLabel>{'buy date'}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <DatePickerTrigger
                        value={field.value} 
                        // @ts-expect-error Prop is used by Next.js internals
                        suppressHydrationWarning
                      />
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
          <Button 
            className="px-3"
            variant="outline"
            size="icon" 
            disabled={isLoading}
          >
            <MagnifyingGlassIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QueryForm;

type QueryFormValues = z.infer<typeof ZQueryFormValues>;
const ZQueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
});
