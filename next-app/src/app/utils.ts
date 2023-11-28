import { queryTimeSeries } from '@/lib/marketstack';
import cache from '@/lib/redis';
import { z } from 'zod';

const ZTimeSeries = z.object({
  date: z.string(),
  value: z.number(),
}).array();

const getTimeSeries = async (symbol: string, buyDate: string) => {
  const cacheKey = `${symbol}-${buyDate}`;

  const cachedData = await cache.get(cacheKey);
  if (cachedData) {
    return ZTimeSeries.parse(JSON.parse(cachedData));
  }

  const freshData = await queryTimeSeries({ symbol, buyDate });
  await cache.set(cacheKey, JSON.stringify(freshData));
  return freshData;
};

export const fetchChartData = async ({
  symbol,
  buyDate,
  amount,
}: { 
  symbol: string; 
  buyDate: string;
  amount: number;
}) => {

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

export const getChartSummary = (data: { date: string; index: number; asset: number; }[]) => {
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
