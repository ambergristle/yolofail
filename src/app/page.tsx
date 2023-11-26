import { z } from "zod"
import { getChartData, getChartSummary } from "@/lib/marketstack"
import { SeriesChart } from "./components/series-chart"
import QueryForm from "./components/query-form"

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
        const milliseconds = Date.parse(arg)
        return milliseconds && !isNaN(milliseconds)
      }).optional(),
  }).safeParse(searchParams)

  return results.success
    ? results.data
    : {}
}

type PageProps = {
  searchParams?: SearchParams;
}

const Home = async ({
  searchParams
}: PageProps) => {

  const {
    symbol = 'GME',
    buyDate = '2023-01-01', // one year ago
  } = parseSearchParams(searchParams)
 
  const data = await getChartData({
    symbol,
    buyDate,
    amount: 100
  });

  const {
    currentValue,
    valueDelta,
    percentDelta
  } = getChartSummary(data)

  const sign = valueDelta < 0 ? '-' : '+';
  const valueChange = Math.abs(valueDelta).toFixed(2);
  const percentChange = Math.abs(percentDelta).toFixed(2);

  return (
    <main className="w-screen flex flex-col items-center p-24">
      <header className="w-full flex flex-row justify-between">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {`$${currentValue.toFixed(2)}`}
        </h2>
        <p className="leading-7 text-muted-foreground">
          {`${sign}$${valueChange} (${sign}${percentChange}%)`}
          <span>
            {'against S&P500'}
          </span>
        </p>
      </div>
      <QueryForm />
    </header>
    <div className="w-full h-72">
      <SeriesChart data={data}/>
    </div>
    </main>
  )
}

export default Home;