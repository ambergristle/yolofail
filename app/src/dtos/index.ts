
import { z } from 'zod';

import { CachedTimeSeries, TimeSeriesData, TimeSeriesSearchParams } from '@/types';

const ZTimeSeriesSearchParams = z.object({
  symbol: z.string(),
  buyDate: z.string()
    .regex(/\d{4}-\d{2}-\d{2}/)
    .refine((arg) => {
      const milliseconds = Date.parse(arg);
      return milliseconds && !isNaN(milliseconds);
    }),
  amount: z.string().regex(/^\d+$/),
});

const _ZTimeSeriesSearchParams = ZTimeSeriesSearchParams
  .transform(({ amount, ...params }) => ({
    ...params,
    amount: Number(amount),
  }));

export const parseSearchParams = (
  data: Record<string, string | string[] | undefined>,
  fallback?: z.infer<typeof ZTimeSeriesSearchParams>,
): TimeSeriesSearchParams => {
  const params = (Object.keys(data).length || !fallback)
    ? data
    : fallback;

  return _ZTimeSeriesSearchParams.parse(params);
};

const ZCachedTimeSeries = z.object({
  date: z.string(),
  value: z.number(),
}).array();

export const parseCachedTimeSeries = (
  data: string,
): CachedTimeSeries => {
  const json = JSON.parse(data);
  return ZCachedTimeSeries.parse(json);
};

const ZTimeSeriesData = z.object({
  series: z.object({
    date: z.string(),
    index: z.number(),
    asset: z.number(),
  }).array(),
  summary: z.object({
    currentValue: z.number(),
    valueDelta: z.number(),
    percentDelta: z.number(),
  }),
});

const ZTimeSeriesResult = z.object({
  success: z.literal(true),
  data: ZTimeSeriesData,
});

export const parseTimeSeriesResponse = (
  response: unknown,
): {
  success: true;
  data: TimeSeriesData;
} => {
  return ZTimeSeriesResult.parse(response);
};
