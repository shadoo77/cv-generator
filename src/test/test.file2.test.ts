import { Logger } from '../logger';
import { requestApp } from './testUtils/requestApp';
import { testMongoDB } from './testMongoDB';

const testVar = true;
const str = 'hey';

describe('Test file', () => {
  beforeAll(async () => {
    Logger.debug('=================>>>>>> beforeAll');
    await testMongoDB.initializeTestDB();
  });

  afterAll(async () => {
    Logger.debug('=================>>>>>> afterAll');
    await testMongoDB.dropTestDB();
  });

  describe('test something scope inside the file', () => {
    beforeEach(() => Logger.debug('1 - beforeEach'));
    afterEach(async () => {
      Logger.debug('1 - afterEach');
      await testMongoDB.clearTestDB();
    });

    test('city database has Vienna', () => {
      expect(testVar).toBeTruthy();
    });

    test('city database has San Juan', () => {
      expect(str).toEqual('hey');
    });
  });

  describe('GET / - a simple api endpoint', () => {
    it('Hello API Request', async () => {
      const res = await requestApp.get('/test');
      expect(res.body.msg).toEqual('User works!');
      expect(res.statusCode).toEqual(200);
    });
  });
});
