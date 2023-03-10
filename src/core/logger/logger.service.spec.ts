import { Test } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { winstonConfig } from './winson';

describe('loggerService test', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    moduleRef.useLogger(winstonConfig(process.env['NODE_ENV']));
    loggerService = moduleRef.get<LoggerService>(LoggerService);
  });

  it('loggerService service call', () => {
    expect(loggerService).toBeDefined();
  });

  describe('loggerService function call', () => {
    it('info -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'log');

      loggerService.log('logger service test');

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('warn -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'warn');

      loggerService.warn('logger service test');

      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('error -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'error');

      loggerService.error('logger service test');
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('debug -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'debug');

      loggerService.debug('logger service test');
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('verbose -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'verbose');

      loggerService.verbose('logger service test');
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });

    it('setContext -> ', () => {
      const loggerSpy = jest.spyOn(LoggerService.prototype, 'setContext');

      loggerService.setContext(LoggerService.name);
      expect(loggerSpy).toHaveBeenCalled();
      expect(loggerSpy).toBeCalledTimes(1);
    });
  });
});
