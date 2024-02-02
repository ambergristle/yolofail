'use client';

import { useState } from 'react';
import useSwr from 'swr';
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';

import { parseTimeSeriesResponse } from '@/dtos';
import { TimeSeriesSearchParams } from '@/types';

const useTimeSeriesQuery = (query: TimeSeriesSearchParams) => {
  const [filter, setFilter] = useState(query);

  const { data, error, isLoading } = useSwr({ 
    url: '/api/time-series',
    filter,
  }, queryTimeSeries, { 
    refreshInterval: 1000 * 60 * 60,
  });

  const series = data?.series ?? [];

  return {
    series,
    summary: data?.summary ?? {
      currentValue: 0,
      valueDelta: 0,
      percentDelta: 0,
    },
    isLoading: !series.length && isLoading,
    error,
    filter,
    setFilter: (values: TimeSeriesSearchParams) => setFilter(values),
  };
};

export default useTimeSeriesQuery;

const queryTimeSeries = async (query: { 
  url: string;
  filter: TimeSeriesSearchParams;
}) => {

  const result = await wretch(query.url)
    .addon(QueryStringAddon)
    .query(query.filter)
    .get()
    .json(parseTimeSeriesResponse)
    .then(({ data }) => data);
  
  return result;
};
