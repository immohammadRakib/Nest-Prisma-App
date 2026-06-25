import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 1. নতুন ক্যাটাগরি তৈরি (POST /category)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  // 2. সব ক্যাтаগরি দেখা (GET /category)
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  // 3. ১টি নির্দিষ্ট ক্যাটাগরি আইডি দিয়ে খোঁজা (GET /category/:id)
  @Get(':id')
  findOne(@Param('id') id: string) { // ParseIntPipe বাদ এবং টাইপ string
    return this.categoryService.findOne(id);
  }

  // 4. ক্যাটাগরি আপডেট করা (PATCH /category/:id)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: CreateCategoryDto) { // টাইপ string
    return this.categoryService.update(id, data);
  }

  // 5. ক্যাটাগরি ডিলিট করা (DELETE /category/:id)
  @Delete(':id')
  remove(@Param('id') id: string) { // টাইপ string
    return this.categoryService.remove(id);
  }
}
