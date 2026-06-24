import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  // Service instance variable object matching string
  constructor(private readonly prisma: PrismaService) {}

  @Post('user')
  async createUser(@Body() data: { email: string; name?: string }) {
    // service check data map structure
    return this.prisma.user.create({ data });
  }

  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany();
  }
}
