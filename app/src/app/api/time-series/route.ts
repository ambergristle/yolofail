import { parseSearchParams } from '@/dtos';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {

  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const query = parseSearchParams(searchParams);

  const data = {
    series: [],
    summary: {
      currentValue: 0,
      valueDelta: 0,
      percentDelta: 0,
    },
  };

  return Response.json({
    success: true,
    data,
  }); 
};
