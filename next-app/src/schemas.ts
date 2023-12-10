import { z } from 'zod';

export const _QueryTimeSeriesParams = z.object({
  symbol: z.string(),
  amount: z.coerce.number(),
  buyDate: z.coerce.date(),
});

export type QueryTimeSeriesParams = z.infer<typeof _QueryTimeSeriesParams>;

export type ChartDataQueryParams = {
  symbol: string;
  buyDate: string;
  amount: number;
}

export type TimeSeries = {
  date: string;
  value: number;
}[];

export type ChartData = {
  index: number;
  asset: number;
  date: string;
}[]
