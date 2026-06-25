import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'; // <-- EI LINE-TI MUST ADD KORBEN (.env read korar jonno)
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Console log check korar jonno url link validation print hobe terminal-e

    // 1. Core PG library setup wrapper pool string logic integration
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Wrap pool with Prisma 7 official driver adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass pure driver adapter into root instance matrix
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
