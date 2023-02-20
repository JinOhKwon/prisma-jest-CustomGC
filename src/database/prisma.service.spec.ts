import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('prismaService test', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterEach(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  it('prismaService', async () => {
    expect(await prismaService).toBeDefined();
  });

  describe('PrimsaService 함수 호출', () => {
    it('$connect() -> ', async () => {
      expect(await prismaService.$connect()).toBeUndefined();
    });

    it('$disconnect() -> ', async () => {
      expect(await prismaService.$disconnect()).toBeUndefined();
    });
  });
});
