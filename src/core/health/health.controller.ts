import { Controller, Get, OnApplicationShutdown } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { LoggerService } from '../logger';

@Controller('health')
export class HealthController implements OnApplicationShutdown {
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private readonly loggerService: LoggerService,
  ) { }

  /**
   * 앱이 종료 되었을때 호출되는 훅이다.
   * @param signal 시그널
   */
  onApplicationShutdown(signal?: string) {
    // TODO 비정상 종료를 잡아서 슬랙알람을 주자
    this.loggerService.log(`momentor server down... ${signal}`);
  }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      // the process should not use more than 300MB memory
      () => this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealthIndicator.checkRSS('memory RSS', 500 * 1024 * 1024),
    ]);
  }
}
