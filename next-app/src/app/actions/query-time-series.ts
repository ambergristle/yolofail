'use server';

import { fetchChartData } from '@/controllers';
import { ChartData, ChartDataQueryParams } from '@/schemas';
import { revalidatePath } from 'next/cache';

// aria-live="polite" className="sr-only" role="status"

export const queryTimeSeries = async (
  prev: ChartData, 
  query: ChartDataQueryParams,
) => {
  try {
    console.log(query);
    const data = await fetchChartData(query);

    revalidatePath('/');

    return data;
  } catch (error) {
    console.error(error);

    return prev;
  }
};
