import { AreaChart } from "@tremor/react";

const whatever = () => {

}

const timeSeries = [
  {
    date: 'index',
    Asset: 100,
    Index: 100,
  }
]

const formatPoint = (value: number) => {
  return value.toString()
}

export default function Home() {

  // get data from store

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h2>
        {`$${currentValue}`}
      </h2>
      <p>
        
        <span>
          {'against S&P500'}
        </span>
      </p>
      <AreaChart
        className="h-72 mt-4"
        data={timeSeries}
        index="date"
        categories={["Index", "Asset"]}
        colors={["gray", "green"]}
        valueFormatter={formatPoint}
      />
    </main>
  )
}
