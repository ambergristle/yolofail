import { z } from 'zod';
import { fetchChartData } from '@/controllers';
import ChartView from './components/ChartView';

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * @todo partial return
 * @todo add amount
 * @todo default
 */
const parseSearchParams = (searchParams: SearchParams | undefined) => {
  const results = z.object({
    symbol: z.string().optional(),
    buyDate: z.string()
      .regex(/\d{4}-\d{2}-\d{2}/)
      .refine((arg) => {
        const milliseconds = Date.parse(arg);
        return milliseconds && !isNaN(milliseconds);
      }).optional(),
  }).safeParse(searchParams);

  return results.success
    ? results.data
    : {};
};

type PageProps = {
  searchParams?: SearchParams;
}

const Page = async ({
  searchParams,
}: PageProps) => {

  const {
    symbol = 'GME',
    buyDate = '2023-01-01', // one year ago
  } = parseSearchParams(searchParams);

  const query = {
    symbol,
    buyDate,
    amount: 100,
  };
 
  const data = await fetchChartData(query);

  return (
    <ChartView 
      query={query} 
      data={data}
    />
  );

};

export default Page;
