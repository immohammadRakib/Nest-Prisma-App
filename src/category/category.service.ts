import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
// Jodi folder-er nam 'dto' hoy
import { CreateCategoryDto } from './dto/create-category.dto.js';


@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const slug = data.name.toLowerCase().trim().replace(/\s+/g, '-');
    return this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug: slug,
      },
    });
  }

  // Ei method-ta miss chilo tai error dicchilo
  async findAll() {
    return this.prisma.category.findMany();
  }
}
