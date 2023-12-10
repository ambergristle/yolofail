'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Calendar } from '@/components/calendar';
import { DatePickerTrigger } from '@/components/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form';
import { Input } from '@/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { SubmitButton } from '../submit-button';
import { ChartDataQueryParams } from '@/schemas';

const _QueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
});

type QueryFormValues = z.infer<typeof _QueryFormValues>;

type PropTypes = {
  defaultValues: QueryFormValues;
  onSubmit: (params: ChartDataQueryParams) => void;
}

const QueryForm = ({
  defaultValues,
  onSubmit,
}: PropTypes) => {

  const formProps = useForm({
    resolver: zodResolver(_QueryFormValues),
    defaultValues,
  });

  return (
    <Form {...formProps}>
      <form
        className="flex flex-row items-end space-x-4"
        noValidate
        action={async (values) => {
          const isValid = await formProps.trigger();
          if (isValid) onSubmit(values);
        }}
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
