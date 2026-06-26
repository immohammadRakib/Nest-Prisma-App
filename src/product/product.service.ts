import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, sellerId: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: dto.categorySlug },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug '${dto.categorySlug}' not found`);
    }

    const productSlug = dto.name.toLowerCase().trim().replace(/\s+/g, '-');
    const { categorySlug, ...productData } = dto;

    return this.prisma.product.create({
      data: {
        ...productData,
        slug: productSlug,
        categoryId: category.id,
        sellerId: sellerId, 
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: string, dto: Partial<CreateProductDto>, currentUser: any) {
    const product = await this.findOne(id); 

    if (currentUser.role !== 'ADMIN' && product.sellerId !== currentUser.id) {
      throw new ForbiddenException('You can only edit your own products');
    }

    let productSlug: string | undefined;
    if (dto.name) {
      productSlug = dto.name.toLowerCase().trim().replace(/\s+/g, '-');
    }

    let categoryId: string | undefined;
    if (dto.categorySlug) {
      const category = await this.prisma.category.findUnique({
        where: { slug: dto.categorySlug },
      });
      if (!category) {
        throw new NotFoundException(`Category with slug '${dto.categorySlug}' not found`);
      }
      categoryId = category.id;
    }

    const { categorySlug, ...productData } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(productSlug && { slug: productSlug }),
        ...(categoryId && { categoryId }),
      },
    });
  }

  async remove(id: string, currentUser: any) {
    const product = await this.findOne(id);

    if (currentUser.role !== 'ADMIN' && product.sellerId !== currentUser.id) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
