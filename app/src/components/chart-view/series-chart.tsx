'use client';

import { LoadingIcon } from '@/components/svg/loading';
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
    <div className="flex h-96 flex-col items-center justify-center">
      <LoadingIcon 
        className="size-8 animate-spin text-muted-foreground" 
      />
    </div>
  );

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
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
      colors={['gray', isLoss ? 'rose' : 'lime']}
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
