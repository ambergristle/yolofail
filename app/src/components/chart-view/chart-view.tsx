'use client';

import { TimeSeriesSearchParams } from '@/types';
import { useTimeSeriesQuery } from '../query-context';
import QueryForm from './query-form';
import SeriesChart from './series-chart';

type PropTypes = {
  query: TimeSeriesSearchParams;
}

const ChartView = ({ query }: PropTypes) => {

  const { 
    series,
    summary: {
      currentValue,
      valueDelta,
      percentDelta,
    },
    isLoading,
    error,
    filter,
    setFilter,
  } = useTimeSeriesQuery(query);

  const isLoss = valueDelta < 0;
  const sign = isLoss ? '-' : '+';
  const valueChange = Math.abs(valueDelta).toFixed(2);
  const percentChange = Math.abs(percentDelta).toFixed(2);
  
  return (
    <main className="pt-20">
      <header className="mb-2 flex w-full flex-col justify-between md:flex-row">
        <div className="mb-4">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {`$${currentValue.toFixed(2)}`}
          </h2>
          <p className="leading-7 text-muted-foreground">
            {`${sign}$${valueChange} (${sign}${percentChange}%)`}
            <span>
              {' vs S&P500'}
            </span>
          </p>
        </div>
        <QueryForm
          defaultValues={{
            symbol: filter.symbol,
            buyDate: new Date(filter.buyDate),
            amount: filter.amount,
          }}
          onSubmit={setFilter}
          isLoading={isLoading}
        />
      </header>
      <SeriesChart
        symbol={query.symbol}
        isLoading={isLoading}
        error={error}
        data={series} 
        isLoss={isLoss}
      />
    </main>
  );
};

export default ChartView;
