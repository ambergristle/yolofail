'use client';

import { AreaChart } from '@tremor/react';

import { ChartData } from '@/schemas';

type PropTypes = {
  data: ChartData;
  isLoss: boolean;
}

const SeriesChart = ({
  data,
  isLoss,
}: PropTypes) => {

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

export default SeriesChart;
