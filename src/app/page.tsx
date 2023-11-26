

import { Suspense } from "react"
import Header from "./components/header"
import { SeriesChart } from "./components/series-chart"
import QueryForm from "./components/query-form"
import { getChartData } from "./api/time-series/marketstack"
import { AreaChart } from "@tremor/react"

const Home = async () => {
 
  const data = await getChartData({
    symbol: 'GME',
    buyDate: '2023-01-01',
    amount: 100
  });

  console.log(data)

  return (
    <main className="w-screen flex flex-col items-center p-24">
      <header className="w-full flex flex-row justify-between">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {/* {formatCurrency(currentValue)} */}
        </h2>
        <p className="leading-7 text-muted-foreground">
          {/* {formatCurrency(currentValue)} */}
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