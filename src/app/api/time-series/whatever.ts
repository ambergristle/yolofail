import format from 'date-fns/format';
import wretch from 'wretch'
import QueryStringAddon from "wretch/addons/queryString"
import { z } from 'zod';

const provider = wretch('https://api.marketstack.com/v1/eod')
  .addon(QueryStringAddon)

const Results = z.object({
  data: z.object({
    date: z.coerce.date(), // hm
    adj_close: z.number()
  }).array(),
  pagination: z.object({
    offset: z.number(),
    count: z.number(),
    total: z.number(),
  }),
})

type Results = z.infer<typeof Results>;

async function something({
  symbol,
  buyDate,
  offset,
}: {
  symbol: string;
  buyDate: string;
  offset?: number;
}) {

  const series: any[] = [];



  const { data, pagination } = await provider
    .query({
    // really?
    access_key: process.env.MARKETSTACK_API_KEY,
    symbols: symbol, // plural?
    date_from: buyDate,
    limit: 1000,
    sort: 'ASC',
    ...(offset && { offset })
  })
  .get()
  .json(Results.parse)

  series.push(...data)

  if (pagination.offset + pagination.count === pagination.total) {
    // 
  }

  return series
}


function somethingElse(series: Results['data'], dollarSpend: number) {
  if (!series.length) return series;

  const { adj_close: purchasePrice } = series[0];
  const purchasedShareCount = dollarSpend / purchasePrice;
  
  const arr = series.reduce((agg, point) => {
    const { date, adj_close: adjustedClose } = point;

    agg.push({
      label: date.toISOString().split('T')[0],
      value: adjustedClose * purchasedShareCount
    })

    return agg;
  }, [] as { label: string; value: number; }[])

  const initialValue = arr[0].value;
  const currentValue = arr[arr.length - 1].value

  return {
    arr,
    initialValue,
    currentValue,
    percentChange: (currentValue / initialValue) * 100
  }
}