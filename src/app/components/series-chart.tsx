"use client"

import { Typography } from "@/components/typography";
import { AreaChart } from "@tremor/react";
import Header from "./header";
import { Suspense } from "react";

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
    <AreaChart
    data={data}
    index="date"
    categories={["index", "asset"]}
    colors={["gray", "green"]}
    valueFormatter={formatPoint}
    showAnimation
      />
  )

}