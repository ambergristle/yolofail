'use client';

import { LoadingIcon } from '@/components/ui/loading-icon';
import { Typography } from '@/components/ui/typography';
import { TimeSeriesPoint } from '@/types';
import AreaChart from './area-chart';

type PropTypes = {
  symbol: string;
  data: TimeSeriesPoint[];
  isLoss: boolean;
  isLoading: boolean;
  error?: unknown;
}

const SeriesChart = ({
  symbol,
  data,
  isLoss,
  isLoading,
  error,
}: PropTypes) => {

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center">
      <LoadingIcon 
        className="h-8 w-8 animate-spin text-muted-foreground" 
      />
    </div>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Typography className="text-destructive" variant='h3'>
          {error instanceof Error ? error.message : 'Something went wrong...'}
        </Typography>
      </div>
    );
  }

  const labels = {
    index: 'S&P500',
    asset: symbol,
  };

  return (
    <AreaChart
      data={data}
      index="date"
      categories={['index', 'asset']}
      colors={['gray', isLoss ? 'red' : 'green']}
      getLabel={(key) => labels[key]}
      formatValue={currencyFormatter.format}
    />
  );
};

export default SeriesChart;

const currencyFormatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
