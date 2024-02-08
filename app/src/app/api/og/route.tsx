import { ImageResponse } from 'next/og';
import { SparkAreaChart } from '@tremor/react';

import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import { oneYearAgo } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const query = parseSearchParams(searchParams, {
      symbol: 'GME',
      buyDate: oneYearAgo(),
      amount: '100',
    });
    
    const data = await fetchChartData(query);

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
