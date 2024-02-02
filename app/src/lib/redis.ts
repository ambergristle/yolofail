import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';

export default (() => {
  let _client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  const connect = async () => {
    if (!_client) {
      console.log(process.env.REDIS_URL);
      _client = await createClient({
        url: process.env.REDIS_URL,
      })
        .on('connect', () => console.info('Redis Client Connected'))
        .on('error', (error) => console.info('Redis Client Error', error))
        .connect();
    }

    return _client;
  };

  return {
    get: async (key: string) => {
      const client = await connect();
      console.log(key);
      return client.get(key);
    },
    set: async (key: string, value: string) => {
      const client = await connect();
      return client.set(key, value, {
        EX: 60 * 60 * 24,
      });
    },
    close: async () => {
      return await _client?.quit();
    },
  };

})();
