import wretch from 'wretch'
import QueryStringAddon from "wretch/addons/queryString"
import { z } from 'zod';

const MarketStackResults = z.object({
  data: z.object({
    date: z.coerce.date(), // hm
    adj_close: z.number()
  })
  .array(),
  pagination: z.object({
    offset: z.number(),
    count: z.number(),
    total: z.number(),
  }),
})

type MarketStackResults = z.infer<typeof MarketStackResults>;

type TimeSeries = MarketStackResults['data'];

const marketStack = wretch('https://api.marketstack.com/v1/eod')
  .addon(QueryStringAddon)

const queryTimeSeries = async ({
  symbol,
  buyDate,
  offset = 0,
  series = [],
}: {
  symbol: string;
  buyDate: string;
  offset?: number;
  series?: any[];
}): Promise<TimeSeries> => {

  try {
    const { data, pagination } = await marketStack
    .query({
    access_key: process.env.MARKETSTACK_API_KEY,
    symbols: symbol,
    date_from: buyDate,
    limit: 1000,
    sort: 'ASC',
    ...(offset && { offset })
  })
  .get()
  .json((data) => {
    const result = MarketStackResults.safeParse(data)
    if (result.success) return result.data;
    throw new Error()
  })

  series.push(...data)

  if (pagination.offset + pagination.count === pagination.total) {
    if (series.length !== pagination.total) throw new Error()
    return series
  }

  return await queryTimeSeries({
    symbol,
    buyDate,
    offset: series.length,
    series,
  })

  } catch (error) {

    // handle rate limit (429)
    throw new Error('', { 
      cause: error
    })
  }
}

export const getChartData = async ({
  symbol,
  buyDate,
  amount
}: { 
  symbol: string; 
  buyDate: string;
  amount: number;
}) => {

  const [indexSeries, assetSeries] = await Promise.all([
    queryTimeSeries({ symbol: 'IVV', buyDate }),
    queryTimeSeries({ symbol, buyDate }),
  ])

  if (!indexSeries.length || !assetSeries.length) throw new Error()
  // length equivalence?
  
  const indexShareCount = amount / indexSeries[0].adj_close;
  const assetShareCount = amount / assetSeries[0].adj_close;

  return indexSeries.map((indexPoint, i) => {
    const assetPoint = assetSeries.at(i)
    if (!assetPoint) throw new Error()

    return {
      date: indexPoint.date.toISOString().split('T')[0],
      index: indexPoint.adj_close * indexShareCount,
      asset: assetPoint.adj_close * assetShareCount,
    }
  })

}

const getChartSummary = (data: { date: string; index: number; asset: number; }[]) => {
  const initialValues = data[0];
  const currentValues = data[data.length - 1];

  const indexPercentChange = (currentValues.index / initialValues.index) * 100
  const assetPercentChange = (currentValues.asset / initialValues.asset) * 100

  return {
    currentValue: currentValues.asset,
    valueDelta: currentValues.asset - currentValues.index,
    percentDelta: assetPercentChange - indexPercentChange
  }
}