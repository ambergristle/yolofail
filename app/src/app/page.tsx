import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import { Typography } from '@/components/ui/typography';
import ChartView from '@/components/chart-view';
import { QueryContextProvider } from '@/components/query-context';
import { oneYearAgo } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const Page = async ({ searchParams = {} }: PageProps) => {
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

    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : 'Something went wrong...';

    /** @todo specific error handling */
    return (
      <main className="flex h-96 flex-col items-center justify-center pt-20">
        <Typography className="text-destructive" variant="h3">
          {errorMessage}
        </Typography>
      </main>
    );
  }
};

export default Page;
