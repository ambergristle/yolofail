import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type RouteMethods = {
  [Method in RequestMethod]?: NextApiHandler;
}

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: NextApiHandler
) => unknown | Promise<unknown>;

type RouteOptions = {
  middleware?: Middleware;
}

export const handleRoute = (handlers: RouteMethods, options: RouteOptions = {}): NextApiHandler => {

  return async (req, res) => {
    try {
      if (!isRequestMethod(req.method)) throw new Error('invalid method');

      const handleMethod = handlers[req.method];
      if (!handleMethod) throw new Error('invalid method');

      if (options.middleware) {
        return await options.middleware(req, res, handleMethod);
      } else {
        return await handleMethod(req, res);
      }

    } catch (error) {
      return handleError(req, res, error);
    }
  };
};

/** @todo */
const handleError = (req: NextApiRequest, res: NextApiResponse, error: unknown) => {
  console.error(error);
  return res.status(500).end();
};

const requestMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
type RequestMethod = typeof requestMethods[number];

const isRequestMethod = (value: unknown): value is RequestMethod => {
  return requestMethods.includes(value as RequestMethod);
};
