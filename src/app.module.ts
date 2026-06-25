import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
