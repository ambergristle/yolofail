import { STATUS_CODES } from 'http';

type HttpErrorOptions = {
  statusCode: number;
  cause?: unknown;
}

export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(message: string, options: HttpErrorOptions) {
    const { statusCode, cause } = options;

    super(message ?? STATUS_CODES[statusCode], { cause });

    this.name = 'HttpError';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, HttpError);
  }
}

type ServiceErrorOptions = Omit<HttpErrorOptions, 'statusCode'>;

export class ServiceError extends HttpError {
  constructor(message: string, options: ServiceErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: 500,
    });

    this.name = 'ServiceError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, options: ServiceErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: 404,
    });

    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends HttpError {
  constructor(message: string, options: ServiceErrorOptions = {}) {
    super(message, {
      ...options,
      statusCode: 429,
    });

    this.name = 'RateLimitError';
  }
}
