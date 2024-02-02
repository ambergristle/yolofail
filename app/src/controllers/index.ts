'use server';

import { parseCachedTimeSeries } from '@/dtos';
import { queryTimeSeries } from '@/lib/marketstack';
import db from '@/lib/redis';
import { TimeSeriesData, TimeSeriesPoint } from '@/types';

export const fetchChartData = async ({
  symbol,
  buyDate,
  amount,
}: {
  symbol: string;
  buyDate: string;
  amount: number;
}): Promise<TimeSeriesData> => {

  const [indexSeries, assetSeries] = await Promise.all([
    getSymbolTimeSeries('IVV', buyDate),
    getSymbolTimeSeries(symbol, buyDate),
  ]);

  /** @todo handle errors */
  if (!indexSeries.length || !assetSeries.length) throw new Error();
  if (indexSeries.length !== assetSeries.length) throw new Error();

  const indexShareCount = amount / indexSeries[0].value;
  const assetShareCount = amount / assetSeries[0].value;

  const series = indexSeries.map((indexPoint, i) => {
    const assetPoint = assetSeries[i];
    return {
      date: indexPoint.date.split('T')[0],
      index: indexPoint.value * indexShareCount,
      asset: assetPoint.value * assetShareCount,
    };
  });

  return {
    series: series,
    summary: generateSummary(series),
  };
};

const getSymbolTimeSeries = async (symbol: string, buyDate: string) => {
  
  const cacheKey = `${symbol}-${buyDate}`;
  const cache = await db.connect();
  
  const cached = await cache.get(cacheKey);
  if (cached) {
    return parseCachedTimeSeries(cached);
  }

  const fresh = await queryTimeSeries({ symbol, buyDate });
  await cache.set(cacheKey, JSON.stringify(fresh));

  return fresh;
};

const generateSummary = (data: TimeSeriesPoint[]) => {

  if (!data.length) return {
    currentValue: 0,
    valueDelta: 0,
    percentDelta: 0,
  };

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
