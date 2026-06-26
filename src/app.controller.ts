import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Controller()
export class AppController {
  // Service instance variable object matching string
  constructor(private readonly prisma: PrismaService) {}

@Post('user')
async createUser(@Body() data: { email: string; name: string }) {
  // data.name ke optional na rekhe string nishchit korun
  return this.prisma.user.create({ 
    data: {
      email: data.email,
      name: data.name,
      passwordHash: 'dummy_hash_string',
    } 
  });
}


  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany();
  }
}
