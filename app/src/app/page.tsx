import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import { Typography } from '@/components/ui/typography';
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
    console.error(error);
    /** @todo return 404 */
    return (
      <main className="h-80 pt-20">
        <Typography className="text-destructive self-center" variant='h3'>
          {error instanceof Error ? error.message : 'Something went wrong...'}
        </Typography>
      </main>
    );
  }

};

export default Page;

const oneYearAgo = () => {
  const now = new Date();
  const yearAgoValue = now.setFullYear(now.getFullYear() - 1);
  return new Date(yearAgoValue).toISOString().split('T')[0];
};
