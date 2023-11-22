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
      <Typography variant="h2">
        {formatCurrency(currentValue)}
      </Typography>
      <Typography>
        {formatCurrency(currentValue)}
        <span>
          {'against S&P500'}
        </span>
      </Typography>
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