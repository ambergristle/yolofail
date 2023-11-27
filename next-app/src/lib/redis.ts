import { RedisClientType, RedisFunctions, RedisModules, RedisScripts, createClient } from 'redis';

export default (() => {
  let _client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  const connect = async () => {
    if (!_client) {
      _client = await createClient({
        url: 'redis://dragonfly:6379',
      })
        .on('connect', () => console.log('Redis Client Connected'))
        .on('error', (error) => console.log('Redis Client Error', error))
        .connect();
    }

    return _client;
  };

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
      return await _client?.quit();
    },
  };

})();
