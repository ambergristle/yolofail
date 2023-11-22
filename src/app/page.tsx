import { SeriesChart } from "./components/series-chart"

const timeSeries = [
  {
    date: '2022-01-01',
    asset: 100,
    index: 100,
  },
  {
    date: '2023-01-01',
    asset: 100,
    index: 100,
  },
  {
    date: '2024-01-01',
    asset: 100,
    index: 100,
  },
  {
    date: '2025-01-01',
    asset: 100,
    index: 100,
  }
]

export default function Home() {

  // get data from store

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SeriesChart data={timeSeries} />
    </main>
  )
}
