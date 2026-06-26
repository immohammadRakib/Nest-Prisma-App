import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard) 
  create(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    const sellerId = req.user.id; 
    return this.productService.create(createProductDto, sellerId);
  }
  
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>, @Req() req: any) {
    return this.productService.update(id, dto, req.user); 
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.productService.remove(id, req.user); 
  }
}
