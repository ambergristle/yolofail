import { fetchChartData } from '@/controllers';
import { parseSearchParams } from '@/dtos';
import { HttpError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export const GET = async (request: Request) => {
  
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
  
    const query = parseSearchParams(searchParams);
  
    const data = await fetchChartData(query);
  
    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    const isKnownError = error instanceof HttpError;

    const { statusCode, message } = isKnownError
      ? error
      : defaultErrorData;

    return new Response(message, {
      status: statusCode,
    });
  }
};

const defaultErrorData = {
  statusCode: 500,
  message: 'Something went wrong',
};
