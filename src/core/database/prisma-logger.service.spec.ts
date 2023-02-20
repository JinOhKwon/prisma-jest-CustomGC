import { Test } from '@nestjs/testing';
import { LoggerModule, winstonConfig } from '../logger';
import { PrismaLogger } from './prisma-logger.service';

describe('prismaLoggerService test', () => {
  let prismaLogger: PrismaLogger;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [PrismaLogger],
    }).compile();

    moduleRef.useLogger(winstonConfig(process.env['NODE_ENV']));
    prismaLogger = moduleRef.get<PrismaLogger>(PrismaLogger);
  });

  it('prismaLoggerService calling', () => {
    expect(prismaLogger).toBeDefined();
  });

  describe('prismaLoggerService fucntion call', () => {
    it('query -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'query');
      prismaLogger.query({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      });

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('info -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'info');

      prismaLogger.info({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      });

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('warn -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'warn');

      prismaLogger.warn({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      });

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('error -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'error');

      prismaLogger.error({
        timestamp: new Date(),
        query: 'test',
        params: 'test',
        duration: 1,
        target: 'test',
      });

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('setDebugMode -> ', () => {
      const loggerSpy = jest.spyOn(PrismaLogger.prototype, 'setDebugMode');
      prismaLogger.setDebugMode(false);
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });
  });
});
