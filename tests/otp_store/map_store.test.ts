import { expect, test } from 'vitest'
import RedisStore from '../../otp_store/redis_store'
import MapStore from '../../otp_store/map_store'

test('Test Map Store', async () => {
    const mapStore: MapStore = new MapStore();

    mapStore.set('test', 123, 60).then(() => { });
    mapStore.get('test').then(value => { expect(value).toBe(123) });
})