import { ImageResponse } from 'next/og';

import { oneYearAgo } from '@/lib/utils';
import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import { TrendingDownIcon } from '@/components/svg/trending-down';
import { TrendingUpIcon } from '@/components/svg/trending-up';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {

  try {
    const { format } = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const query = parseSearchParams(searchParams, {
      symbol: 'GME',
      buyDate: oneYearAgo(),
      amount: '100',
    });

    const { 
      summary: {
        currentValue,
        valueDelta,
        percentDelta,
      },
    } = await fetchChartData(query);

    const isLoss = valueDelta < 0;
    const sign = isLoss ? '-' : '+';
    const valueChange = Math.abs(valueDelta).toFixed(2);
    const percentChange = Math.abs(percentDelta).toFixed(2);
    
    // https://vercel.com/docs/functions/og-image-generation/og-image-examples
    // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

    return new ImageResponse((
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'red',
        }}
      >
        <div tw="flex flex-row items-center bg-current h-full p-2 pl-4">
          <div tw="flex flex-col text-white">
            <div tw="flex flex-row items-center">
              <p tw="text-xl mr-2">
                {query.symbol.toUpperCase()}
              </p>
              {isLoss ? (
                <TrendingDownIcon tw="text-red-600" />
              ) : (
                <TrendingUpIcon tw="text-green-600" />
              )}
            </div>
            <h2 tw="text-6xl m-0">
              {format(currentValue)}
            </h2>
            <p tw="text-slate-400 text-base">
              {`${sign}$${valueChange} (${sign}${percentChange}%) vs S&P500`}
            </p>
          </div>
        </div>
      </div>
    ), {
      width: 400,
      height: 200,
    });

  } catch (error) {

    return new ImageResponse((
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'red',
        }}
      >
        <div tw="flex flex-row items-center bg-current h-full p-2 pl-4 text-white">
          <h2 tw="text-6xl m-0">
            stonks
          </h2>
        </div>
      </div>
    ), {
      width: 400,
      height: 200,
    });
  }
  
};
