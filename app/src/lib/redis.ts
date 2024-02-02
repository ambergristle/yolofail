import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
})
  .on('connect', () => console.info('Redis Client Connected'))
  .on('end', () => console.info('Redis Client Disconnected'));
  // .on('error', (error) => console.error('Redis Client Error:', error));

export type RedisDb = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<string | null>;
  close: () => Promise<string | void>;
}

const db = async (): Promise<RedisDb> => {

  const connect = async () => {
    if (!client.isOpen) {
      await client.connect();
    }
 
    return client;
  };

  return {
    get: async (key: string) => {
      const cache = await connect();
      return cache.get(key);
    },
    set: async (key: string, value: string) => {
      const cache = await connect();
      return cache.set(key, value, {
        EX: 60 * 60 * 24,
      });
    },
    close: async () => {
      if (client.isOpen) return client.quit();
    },
  };
};

export default db;
