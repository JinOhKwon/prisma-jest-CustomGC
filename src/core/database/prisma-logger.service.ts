import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { highlight } from 'sql-highlight';
import { LoggerService } from '../logger';

/**
 * 데이터베이스 로거
 */
@Injectable()
export class PrismaLogger {
  /**
   * 디버그 모드
   */
  private debugMode = false;
  /**
   * 생성자
   *
   * @param option 옵션
   */
  constructor(private loggerService?: LoggerService) { }
  /**
   * 로그
   *
   * @param queryEvent 쿼리 이벤트
   */
  query(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;

    if (this.debugMode) {
      return;
    }

    this.loggerService.log('----------------- QUERY START ----------------- ', {
      context: PrismaLogger.name,
    });

    this.loggerService.log(
      `query: ${highlight(query)} - Took ${duration}ms - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );

    this.loggerService.log('----------------- QUERY END  ----------------- ', {
      context: PrismaLogger.name,
    });
  }

  info(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;
    this.loggerService.log(
      `info: ${highlight(query)} - Took ${duration}ms - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  warn(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;

    this.loggerService.warn(
      `warn: ${highlight(query)} - Took ${duration}ms - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  error(queryEvent: Prisma.QueryEvent): void {
    const { timestamp, query, params, duration } = queryEvent;

    this.loggerService.error(
      `error: ${highlight(query)} - Took ${duration}ms - Params: ${params}`,
      {
        context: PrismaLogger.name,
      },
    );
  }

  /**
   * 디버그 모드를 설정한다.
   *
   * @param debugMode 디버그 모드
   */
  setDebugMode(debugMode: boolean): void {
    if (debugMode) {
      this.debugMode = debugMode;
      this.loggerService.log('디버그 모드 실행');
    }
  }
}
