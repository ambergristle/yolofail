// create new error object to be thrown
export const newError = (status, message) => ({
  response: {
    status,
    ...(message && { message }),
  },
});
