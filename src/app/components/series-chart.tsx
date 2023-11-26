"use client"

import { AreaChart } from "@tremor/react";

type SeriesChartProps = {
  data: {
      date: string;
      asset: number;
      index: number;
  }[]
}

export const SeriesChart = ({ data }: SeriesChartProps) => {

  return (
    <AreaChart
      data={data}
      index="date"
      categories={["index", "asset"]}
      colors={["gray", "green"]}
      valueFormatter={(value) => value.toString()}
      showAnimation
    />
  );
}