import { ResponseError as SendGridError } from '@sendgrid/helpers/classes';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { default as TwilioError } from 'twilio/lib/base/RestException';
import { EndpointError as AtlasError } from 'lib/error';

type ErrorHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: T,
) => void;

interface IAtlasResponse {
  success: boolean;
  status: number;
}
interface IAtlasErrorResponse extends IAtlasResponse {
  success: false;
  name: string;
  message: string;
}

interface IAtlasErrorResponseInternal extends IAtlasErrorResponse {
  headers: any;
  body: any;
  stack?: string
}



/**
 * Handle any SendGridErrors
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param error {SendGridError}
 * @param isExposed Only return external error data
 */
const handleZodError: ErrorHandler<ZodError> = (req, res, error) => {
  const initialIssues: Record<string, string> = {};

  const fieldErrors = error.issues.reduce((agg, issue) => {
    const fieldPath = issue.path.join('.');
    agg[fieldPath] = issue.message;
    return agg;
  }, initialIssues);

  const message = JSON.stringify(fieldErrors, null, 2);
  console.error(`ZodError: ${message}`);

  return res.status(400).json({
    success: false,
    status: 400,
    name: 'PayloadError',
    message,
    fieldErrors,
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
      stack: error.stack,
    }),
  });
};

/**
 * Handle any SendGridErrors
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param error {SendGridError} Includes a SendGrid-specific error code,
 * along with more specific error messages in the SendGridError.response.body
 * @param isExposed Only return external error data
 */
const handleSendGridError: ErrorHandler<SendGridError> = (req, res, error) => {
  console.error(error);
  console.error(error.response.body);
  const status = error.code;
  return res.status(status).json({
    success: false,
    status,
    name: error.name,
    messsage: error.message,
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
      response: error.response,
    }),
  });
};

/**
 * Handle any TwilioErrors
 * @note TwilioError also includes a details property that may be useful if
 * the included values are insufficient for debugging
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param error {TwilioError} Includes a Twilio-specific error code
 * @param isExposed Only return external error data
 */
const handleTwilioError: ErrorHandler<TwilioError> = (req, res, error) => {
  console.error(error);
  /**
   * @link https://www.twilio.com/docs/api/errors
   * 20008 - Cannot access this resource with Test Credentials
   * 20023 - Phone number is incorrect: it cannot be null and have non-decimal symbols
   * 20101 - The Access Token provided to the Twilio API was invalid
   * 20429 - Too many requests
   * 20500 - Internal server error
   * 20503 - Service unavailable
   * 21212 - Invalid 'From' number
   * 21210 - 'From' number is unverified
   * 21213 - 'From' number is required
   * 21214 - 'To' number cannot be reached
   * 21217 - 'To' number appears invalid
   * 21216 - Blocked by Twilio blocklist
   * 21614 - Invalid 'To' number
   */
  return res.status(error.status).json({
    success: false,
    status: error.status,
    name: error.name,
    message: error.message,
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
      stack: error.stack,
      // specific to TwilioError
      code: error.code,
      details: error.details,
      moreInfo: error.moreInfo,
    }),
  });
};

/**
 * Handle any AtlasErrors thrown by the system
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param error {AtlasError} Will contain status
 * @param isExposed Only return external error data
 */
const handleAtlasError: ErrorHandler<AtlasError> = (req, res, error) => {
  console.error(error);
  return res.status(error.status).json({
    success: false,
    status: error.status,
    name: error.name,
    message: error.message,
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
      stack: error.stack,
    }),
  });
};

/**
 * Handle any unrecognized Errors
 * @param req {NextApiRequest}
 * @param res {NextApiResponse}
 * @param error {Error}
 * @param isExposed Only return external error data
 */
const handleError: ErrorHandler<Error> = (req, res, error) => {
  console.error(error);
  const status = 500;
  return res.status(status).json({
    success: false,
    status,
    name: error.name,
    message: error.message,
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
      stack: error.stack,
    }),
  });
};

export const parseErrorV2: ErrorHandler = (req, res, error) => {
  if (error instanceof ZodError) return handleZodError(req, res, error);
  if (error instanceof SendGridError) return handleSendGridError(req, res, error);
  if (error instanceof TwilioError) return handleTwilioError(req, res, error);
  if (error instanceof AtlasError) return handleAtlasError(req, res, error);
  if (error instanceof Error) return handleError(req, res, error);

  console.error(error);
  return res.status(500).json({
    success: false,
    status: 500,
    name: 'UnknownError',
    message: 'Something went horribly wrong',
    // these should not be publicly accessible
    ...(!isExposed && {
      headers: req.headers,
      body: req.body,
    }),
  });
};
