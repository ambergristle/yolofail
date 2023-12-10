'use client';

import { useFormState } from 'react-dom';

import SeriesChart from './SeriesChart';
import QueryForm from './QueryForm';
import { ChartData, ChartDataQueryParams } from '@/schemas';
import { queryTimeSeries } from '../../actions/query-time-series';

const getChartSummary = (data: ChartData) => {
  const initialValues = data[0];
  const currentValues = data[data.length - 1];

  const indexPercentChange = (currentValues.index / initialValues.index) * 100;
  const assetPercentChange = (currentValues.asset / initialValues.asset) * 100;

  return {
    currentValue: currentValues.asset,
    valueDelta: currentValues.asset - currentValues.index,
    percentDelta: assetPercentChange - indexPercentChange,
  };
};


type PropTypes = {
  query: ChartDataQueryParams;
  data: ChartData;
}

const ChartView = (props: PropTypes) => {

  const [data, dispatch] = useFormState(queryTimeSeries, props.data);

  const {
    currentValue,
    valueDelta,
    percentDelta,
  } = getChartSummary(data);

  const isLoss = valueDelta < 0;
  const sign = isLoss ? '-' : '+';
  const valueChange = Math.abs(valueDelta).toFixed(2);
  const percentChange = Math.abs(percentDelta).toFixed(2);

  
  
  return (
    <main className="flex w-screen flex-col items-center p-24">
      <header className="flex w-full flex-row justify-between">
        <div>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {`$${currentValue.toFixed(2)}`}
          </h2>
          <p className="text-muted-foreground leading-7">
            {`${sign}$${valueChange} (${sign}${percentChange}%)`}
            <span>
              {' against S&P500'}
            </span>
          </p>
        </div>
        <QueryForm 
          defaultValues={{
            symbol: props.query.symbol,
            buyDate: new Date(props.query.buyDate),
            amount: 100,
          }}
          onSubmit={dispatch}
        />
      </header>
      <div className="h-72 w-full">
        <SeriesChart data={data} isLoss={isLoss} />
      </div>
    </main>
  );
};

export default ChartView;
