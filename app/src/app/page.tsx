import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import ChartView from '@/components/chart-view';
import { QueryContextProvider } from '@/components/query-context';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
}

const Page = async ({
  searchParams = {},
}: PageProps) => {

  try {
    const query = parseSearchParams(searchParams, {
      symbol: 'GME',
      buyDate: oneYearAgo(),
      amount: '100',
    });

    const data = await fetchChartData(query);
  
    return (
      <QueryContextProvider query={query} data={data}>
        <ChartView query={query} />
      </QueryContextProvider>
    );
  } catch (error) {
    /** @todo return 404 */
    return null;
  }

};

export default Page;

const oneYearAgo = () => {
  const now = new Date();
  const yearAgoValue = now.setFullYear(now.getFullYear() - 1);
  return new Date(yearAgoValue).toISOString().split('T')[0];
};
