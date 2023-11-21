"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

function DatePickerTrigger({ value }: { value: Date | undefined }) {
  return (
    <Button
      variant={"outline"}
      className={cn(
        "w-[280px] justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value ? format(value, "PPP") : <span>{'Pick a date'}</span>}
    </Button>
  )
}

export {
  DatePickerTrigger
}
