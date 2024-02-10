'use server';

import { parseCachedTimeSeries } from '@/dtos';
import { HttpError, ServiceError } from '@/lib/errors';
import { queryTimeSeries } from '@/lib/marketstack';
import db, { RedisDb } from '@/lib/redis';
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

  /** @todo wrap error? */
  const cache = await db();

  const [indexSeries, assetSeries] = await Promise.all([
    getSymbolTimeSeries(cache, 'IVV', buyDate),
    getSymbolTimeSeries(cache, symbol, buyDate),
  ]).finally(cache.close);

  const dataMissing = !indexSeries.length || !assetSeries.length;
  const dataInvalid = indexSeries.length !== assetSeries.length;

  if (dataMissing || dataInvalid) {
    throw new ServiceError('Data incomplete or unavailable');
  }

  const indexShareCount = amount / indexSeries[0].value;
  const assetShareCount = amount / assetSeries[0].value;

  let maxValue = 0;
  let minValue = 0;

  const series = indexSeries.map((indexPoint, i) => {
    const assetPoint = assetSeries[i];

    if (assetPoint.value > maxValue) {
      maxValue = assetPoint.value;
    }

    if (assetPoint.value < minValue) {
      minValue = assetPoint.value;
    }

    return {
      date: indexPoint.date.split('T')[0],
      index: indexPoint.value * indexShareCount,
      asset: assetPoint.value * assetShareCount,
    };
  });

  return {
    series: series,
    summary: {
      ...generateSummary(series),
      minValue,
      maxValue,
    },
  };
};

const getSymbolTimeSeries = async (cache: RedisDb, symbol: string, buyDate: string) => {
  try {
    const cacheKey = `${symbol}-${buyDate}`;  
    const cached = await cache.get(cacheKey);
  
    if (cached) {
      return parseCachedTimeSeries(cached);
    }
  
    const fresh = await queryTimeSeries({ symbol, buyDate });
    await cache.set(cacheKey, JSON.stringify(fresh));
  
    return fresh;
  } catch (cause) {
    if (cause instanceof HttpError) throw cause;
    /** @todo */
    throw new ServiceError('Something went wrong', { cause });
  }
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
