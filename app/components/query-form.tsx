import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { DatePickerTrigger } from "@/components/date-picker";
import { Calendar } from "@/components/calendar";
import { Button } from "@/components/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import wretch from 'wretch'

const QueryFormValues = z.object({
  symbol: z.string(),
  amount: z.number().min(1), // max?
  buyDate: z.date(),
})

type QueryFormValues = z.infer<typeof QueryFormValues>;

const getDefaultValues = () => {
  return {
    symbol: 'GME',
    amount: 100,
    buyDate: new Date(), // years ago
  }
}

async function queryTimeSeries(payload: QueryFormValues) {
  const result = await wretch('/api/time-series')
    .post(payload)
    .json()
    .catch(console.error)
  // parse n shit
}

export default function QueryForm() {

  const formProps = useForm({
    resolver: zodResolver(QueryFormValues),
    defaultValues: getDefaultValues(),
  })

  async function onSubmit(values: QueryFormValues) {
    await queryTimeSeries(values)
  }

  return (
    <Form {...formProps}>
      <form
        className="space-y-8" 
        noValidate
        onSubmit={formProps.handleSubmit(onSubmit, console.error)}
      >
        <FormField
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'symbol'}</FormLabel>
              <FormControl>
                <Input placeholder={'GME'} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{'symbol'}</FormLabel>
              <FormControl>
                {/* start adornment? */}
                <Input type="number" placeholder={'100.00'} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="buyDate"
          render={({ field }) => (
            <FormItem>
            <FormLabel>{'buy date'}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <DatePickerTrigger
                      value={field.value}
                    />
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </FormControl>
                </PopoverTrigger>
              </Popover>
            </FormControl>
          </FormItem>
          )}
        />
        <Button disabled={!formProps.formState.isDirty}>
          {'yeet'}
        </Button>
      </form>
    </Form>
  )
}