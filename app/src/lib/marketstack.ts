import { z } from 'zod';

import { CachedTimeSeries } from '@/types';

// const MarketStack = wretch('https://api.marketstack.com/v1/eod')
//   .addon(QueryStringAddon);

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

    const params: Record<string, string> = {
      /** @todo extract */
      access_key: `${process.env.MARKETSTACK_API_KEY}`,
      symbols: symbol,
      date_from: buyDate,
      limit: '1000',
      sort: 'ASC',
      ...(offset && { offset: `${offset}` }),
    };

    const url = 'https://api.marketstack.com/v1/eod?' + new URLSearchParams(params);

    const { data, pagination } = await fetch(url).then((res) => {
      console.log(res.status);
      console.log(res.headers);
      return res.json();
    }).then(parseResponse);

    // const { data, pagination } = await MarketStack
    //   .query({
    //     access_key: process.env.MARKETSTACK_API_KEY,
    //     symbols: symbol,
    //     date_from: buyDate,
    //     limit: 1000,
    //     sort: 'ASC',
    //     ...(offset && { offset }),
    //   })
    //   .get()
    //   .json(parseResponse);

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
    if (error instanceof Error) console.error(error.name);
    /** @todo handle rate limit - 429 */
    throw error;
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
