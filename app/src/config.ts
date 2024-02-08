import { EnvError } from '@/lib/errors';

export const getBaseUrl = () => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new EnvError('BASE_URL unset');
  return baseUrl;
};
