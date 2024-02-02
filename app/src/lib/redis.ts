import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
})
  .on('connect', () => console.info('Redis Client Connected'))
  .on('end', () => console.info('Redis Client Disconnected'));
  // .on('error', (error) => console.error('Redis Client Error:', error));

export type RedisCache = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<string | null>;
  close: () => Promise<string>;
}

const cache = () => {

  const connection = client.connect();

  return {
    get: async (key: string) => {
      const client = await connection;
      return client.get(key);
    },
    set: async (key: string, value: string) => {
      const client = await connection;
      return client.set(key, value, {
        EX: 60 * 60 * 24,
      });
    },
    close: async () => {
      return connection.then((conn) => {
        return conn.quit();
      });
    },
  };
};

export default cache();
