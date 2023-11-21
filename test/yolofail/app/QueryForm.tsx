import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { DatePickerTrigger } from "@/components/date-picker";
import { Calendar } from "@/components/calendar";
import { Button } from "@/components/button";

const getDefaultValues = () => {
  return {
    symbol: 'GME',
    amount: 100,
    buyDate: new Date(), // years ago
  }
}

export default function QueryForm() {

  const formProps = useForm({
    defaultValues: getDefaultValues(),
  })

  return (
    <Form {...formProps}>
      <form 
        className="space-y-8" 
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
                <Input placeholder={'100.00'} {...field} />
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