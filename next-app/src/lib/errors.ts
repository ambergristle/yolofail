import { STATUS_CODES } from 'http';

// https://stackoverflow.com/questions/59625425/understanding-error-capturestacktrace-and-stack-trace-persistance

// https://gist.github.com/TooTallNate/4fd641f820e1325695487dfd883e5285

// https://javascript.info/custom-errors

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses

class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message ?? STATUS_CODES[statusCode]);

    this.name = 'HttpError';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, HttpError);
  }
}

class ClientError extends HttpError {
  constructor(statusCode: number = 400, message?: string) {
    super(statusCode, message);
    this.name = 'ClientError';
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);

    this.name = 'NotFoundError';
  }
}

// not found

class ServerError extends HttpError {
  constructor(statusCode: number, message?: string) {
    super(statusCode, message);
    this.name = 'ServerError';
  }
}

class ValidationError extends Error {
  public readonly name = 'ValidationError';
  constructor(message: string) {
    super(message);

    this.name = 'ValidationError';
  }
}

// cause

// no index and/or asset arr len
// index arr len != asset arr len

// sendgrid failure

// marketstack rate limit

// marketstack invalid data
// marektstack disconnect between aggregated + pagination

// component errors

// 400
// bad request (syntax)

// 401
// unauthenticated

// 403
// unauthorized

// 405
// invalid method

// 418
// teapot

// 422
// syntactically correct, semantically invalid

// 425
// too early/replay

// 429
// rate limit

// 503
// unavailable/rate limited
