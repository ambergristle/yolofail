"use client"

import { Typography } from "@/components/typography";
import { AreaChart } from "@tremor/react";

const formatCurrency = (value: number) => {
  return `$${value}`
}

const formatPoint = (value: number) => {
  return value.toString()
}

type SeriesChartProps = {
  data: {
      date: string;
      asset: number;
      index: number;
  }[]
}

export const SeriesChart = ({
  data
}: SeriesChartProps) => {
  const currentValue = 100

  return (
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
      <div className="h-72">
        <AreaChart

          data={data}
          index="date"
          categories={["index", "asset"]}
          colors={["gray", "green"]}
          valueFormatter={formatPoint}
        />
      </div>
    </div>
  )

}