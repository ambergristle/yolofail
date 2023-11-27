'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/button';
import { Calendar } from '@/components/calendar';
import { DatePickerTrigger } from '@/components/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/form';
import { Input } from '@/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';


const ZQueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
});

type QueryFormValues = z.infer<typeof ZQueryFormValues>;

/** @todo hoist + drill */
const getDefaultValues = () => {
  return {
    symbol: 'GME',
    amount: 100,
    buyDate: new Date(), // years ago
  };
};

const QueryForm = () => {
  
  const formProps = useForm({
    resolver: zodResolver(ZQueryFormValues),
    defaultValues: getDefaultValues(),
  });

  const router = useRouter();

  const onSubmit = (values: QueryFormValues) => {
    router.push(`/${values.symbol}`);
  };

  return (
    <Form {...formProps}>
      <form 
        className="flex flex-row items-center space-x-4"
        noValidate
        onSubmit={formProps.handleSubmit(onSubmit)}
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
        <Button variant="outline" size="icon">
          <MagnifyingGlassIcon />
        </Button>
      </form>
    </Form>
  );
};

export default QueryForm;
