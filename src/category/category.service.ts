import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const slug = data.name.toLowerCase().trim().replace(/\s+/g, '-');
    return this.prisma.category.create({
      data: { ...data, slug },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) { 
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async update(id: string, data: CreateCategoryDto) {
    await this.findOne(id); 
    const slug = data.name.toLowerCase().trim().replace(/\s+/g, '-');
    return this.prisma.category.update({
      where: { id },
      data: { ...data, slug },
    });
  }

  async remove(id: string) {
    await this.findOne(id); 
    return this.prisma.category.delete({ where: { id } });
  }
}
