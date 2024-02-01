import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { z } from 'zod';

import { CachedTimeSeries } from '@/types';

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
  series?: CachedTimeSeries;
}): Promise<CachedTimeSeries> => {

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
      .json(parseResponse);

    series.push(...data);

    if (pagination.offset + pagination.count === pagination.total) {
      /** @todo define */
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
    console.log(error);
    /** @todo handle rate limit - 429 */
    throw new Error('', { 
      cause: error,
    });
  }
};

const ZMarketstackEodResponse = z.object({
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

const parseResponse = (data: unknown) => {
  return ZMarketstackEodResponse.parse(data);
};
