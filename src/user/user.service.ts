import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    const { password, address, ...userData } = dto;

    return this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
        role: dto.role || 'BUYER',
        addresses: {
          create: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country || 'Bangladesh',
            isDefault: true,
          },
        },
      },
      include: {
        addresses: true, 
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { addresses: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateRole(id: string, role: any) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
