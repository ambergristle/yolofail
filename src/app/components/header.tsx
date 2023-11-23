"use client"

import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { DatePickerTrigger } from "@/components/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Typography } from "@/components/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { AreaChart } from "@tremor/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formatCurrency = (value: number) => {
  return `$${value}`
}

const formatPoint = (value: number) => {
  return value.toString()
}

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

type HeaderProps = {
  data: {
      date: string;
      asset: number;
      index: number;
  }[]
}

const QueryForm = () => {
  const formProps = useForm({
    resolver: zodResolver(QueryFormValues),
    defaultValues: getDefaultValues(),
  })

  return (
    <Form {...formProps}>
      <form className="flex flex-row items-center space-x-4">
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
      </form>
    </Form>
  )
}

const Header = ({ data }: HeaderProps) => {
  const currentValue = 100

  return (
    <header className="w-full flex flex-row justify-between">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {formatCurrency(currentValue)}
        </h2>
        <p className="leading-7 text-muted-foreground">
          {formatCurrency(currentValue)}
          <span>
            {'against S&P500'}
          </span>
        </p>
      </div>
      <QueryForm />
    </header>
  )
}

export default Header;