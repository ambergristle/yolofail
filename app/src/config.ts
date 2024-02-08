import { EnvError } from '@/lib/errors';

export const getBaseUrl = () => {
  const railwayUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;

  const baseUrl = process.env.BASE_URL ?? railwayUrl;
  
  if (!baseUrl) throw new EnvError('BASE_URL unset');
  return baseUrl;
};
