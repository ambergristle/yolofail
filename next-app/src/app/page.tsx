import { z } from 'zod';
import { fetchChartData, getChartSummary } from './utils';
import { QueryForm } from './components/query-form';
import { SeriesChart } from './components/series-chart';

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

const Home = async ({
  searchParams,
}: PageProps) => {

  const {
    symbol = 'GME',
    buyDate = '2023-01-01', // one year ago
  } = parseSearchParams(searchParams);
 
  const data = await fetchChartData({
    symbol,
    buyDate,
    amount: 100,
  });

  const {
    currentValue,
    valueDelta,
    percentDelta,
  } = getChartSummary(data);

  const isLoss = valueDelta < 0;
  const sign = isLoss ? '-' : '+';
  const valueChange = Math.abs(valueDelta).toFixed(2);
  const percentChange = Math.abs(percentDelta).toFixed(2);

  return (
    <main className="flex w-screen flex-col items-center p-24">
      <header className="flex w-full flex-row justify-between">
        <div>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {`$${currentValue.toFixed(2)}`}
          </h2>
          <p className="text-muted-foreground leading-7">
            {`${sign}$${valueChange} (${sign}${percentChange}%)`}
            <span>
              {' against S&P500'}
            </span>
          </p>
        </div>
        <QueryForm 
          symbol={symbol}
          buyDate={new Date(buyDate)}
          amount={100}
        />
      </header>
      <div className="h-72 w-full">
        <SeriesChart data={data} isLoss={isLoss} />
      </div>
    </main>
  );
};

export default Home;
