'use client';

import { SWRConfig, unstable_serialize } from 'swr';

import { TimeSeriesPoint, TimeSeriesSearchParams } from '@/types';

interface PropTypes {
  query: TimeSeriesSearchParams;
  data: {
    series: TimeSeriesPoint[];
    summary: {
      currentValue: number;
      valueDelta: number;
      percentDelta: number;
    }
  };
  children: React.ReactNode;
}

const QueryContextProvider = ({ query, data, children }: PropTypes) => {

  const key = unstable_serialize({
    url: '/api/time-series',
    filter: query,
  });

  return (
    <SWRConfig 
      value={{ 
        fallback: { [key]: data }, 
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default QueryContextProvider;
