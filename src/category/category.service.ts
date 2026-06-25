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

  // ১. id এর টাইপ পরিবর্তন করে string করা হয়েছে
  async findOne(id: string) { 
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  // ২. id এর টাইপ পরিবর্তন করে string করা হয়েছে
  async update(id: string, data: CreateCategoryDto) {
    await this.findOne(id); // ক্যাটাগরি না থাকলে এরর দেবে
    const slug = data.name.toLowerCase().trim().replace(/\s+/g, '-');
    return this.prisma.category.update({
      where: { id },
      data: { ...data, slug },
    });
  }

  // ৩. id এর টাইপ পরিবর্তন করে string করা হয়েছে
  async remove(id: string) {
    await this.findOne(id); // ক্যাটাগরি না থাকলে এরর দেবে
    return this.prisma.category.delete({ where: { id } });
  }
}
