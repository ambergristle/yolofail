import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';

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
  let connection: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  async function connect() {
    if (!connection) {
      console.log('no conn');
      connection = await client.connect();
    }
    
    return connection;
  }

  return {
    get: async (key: string) => {
      const client = await connect();
      return client.get(key);
    },
    set: async (key: string, value: string) => {
      const client = await connect();
      return client.set(key, value, {
        EX: 60 * 60 * 24,
      });
    },
    close: async () => {
      return await connection?.quit();
    },
  };
};

export default cache();
