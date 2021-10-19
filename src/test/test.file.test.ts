import { Logger } from '../logger';

const testVar = true;
const str = 'hey';

describe('Test file', () => {
  beforeAll(() => {
    Logger.debug('beforeAll');
    // await dbHandler.connect()
  });

  afterAll(() => {
    Logger.debug('afterAll', process.env.NODE_ENV);
    // await dbHandler.closeDatabase()
  });

  describe('test something scope inside the file', () => {
    beforeEach(() => Logger.debug('1 - beforeEach'));
    afterEach(() => {
      Logger.debug('1 - afterEach');
      // await dbHandler.clearDatabase()
    });

    test('city database has Vienna', () => {
      expect(testVar).toBeTruthy();
    });

    test('city database has San Juan', () => {
      expect(str).toEqual('hey');
    });
  });
});
