import { expect, test } from 'vitest';
import MemcachedStore from '../../otp_store/memcached_store';
import Memcached from 'memcached';

test('Test Memcached Store', async () => {
  var memcached = new Memcached(['127.0.0.1:11211']);

  const memcachedStore = new MemcachedStore(memcached);

  await memcachedStore.set('test', 123, 60).then(() => {});
  await memcachedStore.get('test').then(value => {
    expect(value).toBe(123);
  });
  await memcachedStore.del('test').then(() => {});
  await memcachedStore.get('test').then(value => {
    expect(value).toBe(0);
  });
});
