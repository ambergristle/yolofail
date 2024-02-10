
export type TimeSeriesSearchParams = {
  symbol: string;
  buyDate: string;
  amount: number;
};

export type CachedTimeSeries = {
  date: string;
  value: number;
}[];

export type TimeSeriesPoint = {
  date: string;
  index: number;
  asset: number
}

type TimeSeriesSummary = {
  minValue: number;
  maxValue: number;
  currentValue: number;
  valueDelta: number;
  percentDelta: number;
}

export type TimeSeriesData = {
  summary: TimeSeriesSummary;
  series: TimeSeriesPoint[];
}
