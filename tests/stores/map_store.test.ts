import { expect, test } from 'vitest';
import RedisStore from '../../stores/redis_store';
import MapStore from '../../stores/map_store';

test('Test Map Store', async () => {
  const mapStore: MapStore = new MapStore();

  await mapStore.set('test', 123, 60).then(() => {});
  await mapStore.get('test').then(value => {
    expect(value).toBe(123);
  });
  await mapStore.del('test').then(() => {});
  await mapStore.get('test').then(value => {
    expect(value).toBe(0);
  });
});
