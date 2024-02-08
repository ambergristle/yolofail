import { ImageResponse } from 'next/og';
import { SparkAreaChart } from '@tremor/react';

import { fetchChartData } from '@/controllers';
import { oneYearAgo } from '@/lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    const data = await fetchChartData({
      symbol: 'GME',
      buyDate: oneYearAgo(),
      amount: 100,
    });

    const isLoss = data.summary.valueDelta < 0;

    // https://vercel.com/docs/functions/og-image-generation/og-image-examples
    return new ImageResponse((
      <SparkAreaChart
        index="date"
        categories={['asset']}
        data={data.series}
        colors={[isLoss ? 'red' : 'green']}
      />
    ), {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    return new ImageResponse((
      <div>
        stonks
      </div>
    ), {
      width: 1200,
      height: 630,
    });
  }
};
