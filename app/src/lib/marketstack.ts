import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { z } from 'zod';

import { CachedTimeSeries } from '@/types';
import {
  HttpError,
  NotFoundError,
  RateLimitError,
  ServiceError,
} from './errors';

const MarketStack = wretch('https://api.marketstack.com/v1/eod')
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
    const { data, pagination } = await MarketStack
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
      if (series.length !== pagination.total) {
        throw new ServiceError(
          'Data is incomplete or unavailable. Narrow time range or choose a different symbol',
        );
      }

      return series;
    }

    return await queryTimeSeries({
      symbol,
      buyDate,
      offset: series.length,
      series,
    });

  } catch (cause) {
    if (cause instanceof HttpError) throw cause;

    if (cause instanceof z.ZodError) {
      // bad data, or response schema has changed
      throw new ServiceError('Service is currently unavailable. Try again later');
    }

    // https://marketstack.com/documentation#api_errors

    const {
      status,
      json,
    } = parseOrThrowError(cause);

    const code = json.error.code;

    if (status === 404 && code === '404_not_found') {
      throw new NotFoundError('No results found');
    }

    if (status === 429) {
      if (code === 'usage_limit_reached') {
        throw new RateLimitError('Search limit reached. Try again next month', {
          cause,
        });
      }

      if (code === 'rate_limit_reached') {
        throw new RateLimitError('Traffic exceeds capacity. Try again later', {
          cause,
        });
      }
    }

    throw new ServiceError('Something went wrong. Try again later', {
      cause,
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

const ZMarketstackError = z.object({
  status: z.number(),
  json: z.object({
    error: z.object({
      code: z.string(),
      message: z.string(),
    }),
  }),
  url: z.string(),
});

const parseOrThrowError = (error: unknown) => {
  const result = ZMarketstackError.safeParse(error);
  if (!result.success) throw error;
  return result.data;
};
