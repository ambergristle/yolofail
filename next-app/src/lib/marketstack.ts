import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { z } from 'zod';

const ZMarketStackResults = z.object({
  data: z.object({
    date: z.string(), // hm
    adj_close: z.number(),
  }).transform(({ date, adj_close }) => ({
    date,
    value: adj_close,
  })).array(),
  pagination: z.object({
    offset: z.number(),
    count: z.number(),
    total: z.number(),
  }),
});

type MarketStackResults = z.infer<typeof ZMarketStackResults>;

type TimeSeries = MarketStackResults['data'];

const marketStack = wretch('https://api.marketstack.com/v1/eod')
  .addon(QueryStringAddon);

export const queryTimeSeries = async ({
  symbol,
  buyDate,
  offset = 0,
  series = [],
}: {
  symbol: string;
  buyDate: string;
  offset?: number;
  series?: TimeSeries;
}): Promise<TimeSeries> => {

  try {
    const { data, pagination } = await marketStack
      .query({
        access_key: process.env.MARKETSTACK_API_KEY,
        symbols: symbol,
        date_from: buyDate,
        limit: 1000,
        sort: 'ASC',
        ...(offset && { offset }),
      })
      .get()
      .json((data) => {
        const result = ZMarketStackResults.safeParse(data);
        if (result.success) return result.data;
        throw new Error();
      });

    series.push(...data);

    if (pagination.offset + pagination.count === pagination.total) {
      if (series.length !== pagination.total) throw new Error();
      return series;
    }

    return await queryTimeSeries({
      symbol,
      buyDate,
      offset: series.length,
      series,
    });

  } catch (error) {

    /** @todo handle rate limit - 429 */
    throw new Error('', { 
      cause: error,
    });
  }
};
