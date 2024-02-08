
export const BASE_URL = (() => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error('EnvError: BASE_URL unset');
  return baseUrl;
})();
