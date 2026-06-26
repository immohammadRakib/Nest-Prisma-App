import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CategoryModule, ProductModule, UserModule, AuthModule, AddressModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
