'use client';

import { AreaChart } from '@tremor/react';

type SeriesChartProps = {
  data: {
    date: string;
    asset: number;
    index: number;
  }[];
  isLoss: boolean;
}

export const SeriesChart = ({
  data,
  isLoss,
}: SeriesChartProps) => {

  return (
    <AreaChart
      data={data}
      index="date"
      categories={['index', 'asset']}
      colors={['gray', isLoss ? 'red' : 'green']}
      valueFormatter={(value) => `$${value.toFixed(2)}`}
      showAnimation
      showXAxis={false}
      showYAxis={false}
    />
  );
};
