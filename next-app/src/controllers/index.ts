'use server';

import { z } from 'zod';
import { queryTimeSeries } from '@/lib/marketstack';
import cache from '@/lib/redis';
import { ChartData, ChartDataQueryParams, TimeSeries } from '@/schemas';

const _TimeSeries = z.object({
  date: z.string(),
  value: z.number(),
}).array();

const timeSeriesFromCache = (cache: string): TimeSeries => {
  const json = JSON.parse(cache);
  return _TimeSeries.parse(json);
}; 

/**
 * 
 */

const getTimeSeries = async (symbol: string, buyDate: string): Promise<TimeSeries> => {
  const cacheKey = `${symbol}-${buyDate}`;

  const cachedData = await cache.get(cacheKey);
  if (cachedData) {
    return timeSeriesFromCache(cachedData);
  }

  const freshData = await queryTimeSeries({ symbol, buyDate });
  await cache.set(cacheKey, JSON.stringify(freshData));
  return freshData;
};

/**
 * 
 */

export const fetchChartData = async ({
  symbol,
  buyDate,
  amount,
}: ChartDataQueryParams): Promise<ChartData> => {

  const [indexSeries, assetSeries] = await Promise.all([
    getTimeSeries('IVV', buyDate),
    getTimeSeries(symbol, buyDate),
  ]);

  if (!indexSeries.length || !assetSeries.length) throw new Error();
  if (indexSeries.length !== assetSeries.length) throw new Error();
  
  const indexShareCount = amount / indexSeries[0].value;
  const assetShareCount = amount / assetSeries[0].value;

  return indexSeries.map((indexPoint, i) => {
    const assetPoint = assetSeries[i];

    return {
      date: indexPoint.date.split('T')[0],
      index: indexPoint.value * indexShareCount,
      asset: assetPoint.value * assetShareCount,
    };
  });

};
