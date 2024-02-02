import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {

  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const query = parseSearchParams(searchParams);

  const data = await fetchChartData(query);

  return Response.json({
    success: true,
    data,
  }); 
};
