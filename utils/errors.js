// create new error object to be thrown
export const newError = (status, message) => ({
  response: {
    status,
    ...(message && { message }),
  },
});

export class ProviderError extends Error {
  constructor(status) {
    super("");
    this.status = status;
  }
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message || "");
    this.status = status;
  }
}
